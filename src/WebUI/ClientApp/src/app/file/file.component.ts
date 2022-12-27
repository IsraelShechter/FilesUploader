import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileSizeUnit, FileType, FileVm } from '../web-api-client';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  @Input() file: FileVm;
  @Input() isDistriputionMode;
  @Input() color: string;
  @Output() action = new EventEmitter<'edit' | 'delete' | 'split'>();

  constructor() { }

  ngOnInit(): void {
  }

  getSizeTypedesc() {
    return FileSizeUnit[this.file.fileSizeUnit];
  }

  getFileTypedesc() {
    return FileType[this.file.fileType];
  }

  delete() {
    this.action.emit('delete')
  }

  edit() {
    this.action.emit('edit')

  }

  split() {
    this.action.emit('split')

  }

  isMoreThanG() {
    let factor = 1;
    switch (this.file.fileSizeUnit) {
      case FileSizeUnit.KB:
        factor = 1024;
        break;
      case FileSizeUnit.MB:
        factor = 1024 * 1024;
        break;
      case FileSizeUnit.GB:
        factor = Math.pow(1024, 3);
        break;
      default:
        break;
    }
    return (this.file.fileSize * factor) > Math.pow(1024, 3);
  }
}
