import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthorizeService } from '../authorise.service';
import { FileListClient, FileSizeUnit, FileVm, GroupFilesCommand, SaveFilesCommand, SplitFileCommand } from '../web-api-client';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {

  @ViewChild('FileModalTemplate') modalTemplate;
  @ViewChild('AlertModalTemplate')  alertModalTemplate;

  fileModalRef: BsModalRef;
  isEditing: boolean = false;
  fileForm: FormGroup;
  files: FileVm[] = [];
  isDistriputionMode = false;
  colorsDictionary = {};
  alertMessage: string;
  isSuccessMessage = false;

  lettersRegex = /^[a-zA-Zא-ת0-9\s]*[a-zA-Zא-ת0-9][a-zA-Zא-ת0-9\s]*$/
  numberRegEx = /^[+]?\d+([.]\d+)?$/;

  constructor(private modalService: BsModalService, private fb: FormBuilder,
     private authorizeService:  AuthorizeService, private apiService: FileListClient) { }

  ngOnInit(): void {
  }

  addFile(template: TemplateRef<any>) {
    this.isEditing = false;
    this.initNewFileForm();
    this.fileModalRef = this.modalService.show(template, {class: "files-modal"});
    setTimeout(() => document.getElementById("title").focus(), 250);

  }

  getSumOfSize() {
    let sum = 0;
    this.files.forEach(f => {
      sum+=this.getFileSize(f);
    });
    return sum;
  }

  private getFileSize(file: FileVm) {
    let factor = 1;
    switch (file.fileSizeUnit) {
      case FileSizeUnit.KB:
        factor = 1024;
        break;
      case FileSizeUnit.MB:
        factor = Math.pow(1024, 2);
        break;
      case FileSizeUnit.GB:
        factor = Math.pow(1024, 3);
        break;
      default:
        break;
    }
    return (file.fileSize * factor);
  }

  onSubmit() {
    let file = this.fileForm.value;
    file.serial = this.fileForm.get('serial').value;
    file.fileSizeUnit = parseInt(this.fileForm.get('fileSizeUnit').value);
    file.fileSize = parseInt(this.fileForm.get('fileSize').value);
    file.fileType = parseInt(this.fileForm.get('fileType').value);
    this.authorizeService.getUser().subscribe(res=>{
      file.userCreated = res.name;
      if (this.isEditing) {
        let i = this.files.findIndex(x=>x.serial == file.serial);
        this.files[i] = file;
      } else {
        this.files.push(file);
      }
      this.fileModalRef.hide();
    });
  }

  distribution() {
    if (this.files.findIndex(x=>this.getFileSize(x) > Math.pow(1024, 3)) > -1) {
      this.isSuccessMessage = false;
      this.alertMessage =
       "לא ניתן להפיץ כיון שקיים קובץ שגודלו מעל 1G, יש לפצל את כל הקבצים שגודלם מעל 1G";
      this.fileModalRef = this.modalService.show(this.alertModalTemplate);
      setTimeout(() => document.getElementById("title").focus(), 250);

    } else {
      this.apiService.group(<GroupFilesCommand>{ files: this.files}).subscribe(res=>{
        this.files = res;
        this.isDistriputionMode = true;
        this.initColorsDictionary();
      });
    }
  }

  initColorsDictionary() {
    let packages =  this.files.map(x=>x.packageId);
    let uniquePacks = [...new Set(packages)];
    uniquePacks.forEach(p => {
      this.colorsDictionary[p] = this.randomColor();
    });
  }

  randomColor() {
    return `rgba(${this.getRandomInt(0, 255)}, ${this.getRandomInt(0, 255)}, ${this.getRandomInt(0, 255)}, 0.1)`;
  }

  getError(field: string) {
    if (this.fileForm.get(field).hasError('required')) {
      return 'שדה חובה';
    } else if (this.fileForm.get(field).hasError('pattern')) {
      if (field == 'fileSize') {
        return "יש להזין מספר";
      }
      else {
        return "יש להזין מספרים אותיות בעברית ובאנגלית בלבד"
      }
    }
  }

  save() {
    this.apiService.save(<SaveFilesCommand>{files: this.files}).subscribe(res =>{
      if (res == 1) {
        this.isSuccessMessage = true;
        this.alertMessage = "קבצים נקלטו בהצלחה!";
        this.fileModalRef = this.modalService.show(this.alertModalTemplate);
        setTimeout(() => document.getElementById("title").focus(), 250);
      }
    });
  }

  initNewFileForm() {
    this.fileForm = this.fb.group({
      'serial': [{value: this.createRandomSerial(), disabled:true}],
      'fileName': [null, [Validators.required, Validators.pattern(this.lettersRegex)]],
      'fileType': [null, [Validators.required]],
      'fileSize': [null, [Validators.required, Validators.pattern(this.numberRegEx)]],
      'fileSizeUnit': ['2', [Validators.required]],
      'author': [null, [Validators.pattern(this.lettersRegex)]],
      'dateCreated': [null, []],
      'isEncoded': [false, []],
    });
  }

  initEditForm(file: FileVm) {
    this.fileForm = this.fb.group({
      'serial': [{value: file.serial, disabled:true}],
      'fileName': [file.fileName, [Validators.required, Validators.pattern(this.lettersRegex)]],
      'fileType': [file.fileType, [Validators.required]],
      'fileSize': [file.fileSize, [Validators.required, Validators.pattern(this.numberRegEx)]],
      'fileSizeUnit': [file.fileSizeUnit, [Validators.required]],
      'author': [file.author, [Validators.pattern(this.lettersRegex)]],
      'dateCreated': [file.dateCreated, []],
      'isEncoded': [file.isEncoded, []],
    });
  }

  clear() {
    this.fileForm.get('fileName').setValue(null);
    this.fileForm.get('fileType').setValue(null);
    this.fileForm.get('fileSize').setValue(null);
    this.fileForm.get('fileSizeUnit').setValue(2);
    this.fileForm.get('author').setValue(null);
    this.fileForm.get('dateCreated').setValue(null);
    this.fileForm.get('isEncoded').setValue(false);

  }

  fileCancelled(): void {
    this.fileModalRef.hide();
}

  getModalTitle() {
    return this.isEditing ? "עריכת קובץ": "הוספת קובץ";
  }

  private createRandomSerial() {
    return this.getRandomInt(100000000, 999999999)
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  action(index: number, type: 'edit' | 'delete' | 'split', serial:  number) {
    if (type == 'delete') {
      this.deleteFile(index);
    }
    if (type == 'edit') {
      this.editFile(index);
    }
    if (type == 'split') {
      this.splitFile(index);
    }
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  editFile(index: number) {
    let file = this.files[index];
    this.authorizeService.getUser().subscribe(res => {
      if (res.name == file.userCreated) {
        this.isEditing = true;
        this.initEditForm(file);
        this.fileModalRef = this.modalService.show(this.modalTemplate, {class: "files-modal"});
        setTimeout(() => document.getElementById("title").focus(), 250);
      }
    });

  }

  splitFile(index: number) {
    let file = this.files[index];
    this.apiService.split(<SplitFileCommand>{ file}).subscribe(res => {
      this.files.splice(index, 1);
      this.files.push(...res);
    });
  }
}
