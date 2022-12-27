/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.7.0.0 (NJsonSchema v10.1.24.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IFileListClient {
    split(splitCommand: SplitFileCommand): Observable<FileVm[]>;
    group(groupCommand: GroupFilesCommand): Observable<FileVm[]>;
    save(cmd: SaveFilesCommand): Observable<number>;
}

@Injectable({
    providedIn: 'root'
})
export class FileListClient implements IFileListClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    split(splitCommand: SplitFileCommand): Observable<FileVm[]> {
        let url_ = this.baseUrl + "/api/FileList/Split";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(splitCommand);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processSplit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSplit(<any>response_);
                } catch (e) {
                    return <Observable<FileVm[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<FileVm[]>><any>_observableThrow(response_);
        }));
    }

    protected processSplit(response: HttpResponseBase): Observable<FileVm[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(FileVm.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<FileVm[]>(<any>null);
    }

    group(groupCommand: GroupFilesCommand): Observable<FileVm[]> {
        let url_ = this.baseUrl + "/api/FileList/Group";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(groupCommand);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGroup(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGroup(<any>response_);
                } catch (e) {
                    return <Observable<FileVm[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<FileVm[]>><any>_observableThrow(response_);
        }));
    }

    protected processGroup(response: HttpResponseBase): Observable<FileVm[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(FileVm.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<FileVm[]>(<any>null);
    }

    save(cmd: SaveFilesCommand): Observable<number> {
        let url_ = this.baseUrl + "/api/FileList/Save";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(cmd);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processSave(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSave(<any>response_);
                } catch (e) {
                    return <Observable<number>><any>_observableThrow(e);
                }
            } else
                return <Observable<number>><any>_observableThrow(response_);
        }));
    }

    protected processSave(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<number>(<any>null);
    }
}

export class FileVm implements IFileVm {
    serial?: number;
    fileName?: string | undefined;
    fileType?: FileType;
    fileSize?: number;
    fileSizeUnit?: FileSizeUnit;
    author?: string | undefined;
    dateCreated?: Date | undefined;
    isEncoded?: boolean;
    userCreated?: string | undefined;
    packageId?: number;
    sizeFactor?: number;

    constructor(data?: IFileVm) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.serial = _data["serial"];
            this.fileName = _data["fileName"];
            this.fileType = _data["fileType"];
            this.fileSize = _data["fileSize"];
            this.fileSizeUnit = _data["fileSizeUnit"];
            this.author = _data["author"];
            this.dateCreated = _data["dateCreated"] ? new Date(_data["dateCreated"].toString()) : <any>undefined;
            this.isEncoded = _data["isEncoded"];
            this.userCreated = _data["userCreated"];
            this.packageId = _data["packageId"];
            this.sizeFactor = _data["sizeFactor"];
        }
    }

    static fromJS(data: any): FileVm {
        data = typeof data === 'object' ? data : {};
        let result = new FileVm();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["serial"] = this.serial;
        data["fileName"] = this.fileName;
        data["fileType"] = this.fileType;
        data["fileSize"] = this.fileSize;
        data["fileSizeUnit"] = this.fileSizeUnit;
        data["author"] = this.author;
        data["dateCreated"] = this.dateCreated ? this.dateCreated.toISOString() : <any>undefined;
        data["isEncoded"] = this.isEncoded;
        data["userCreated"] = this.userCreated;
        data["packageId"] = this.packageId;
        data["sizeFactor"] = this.sizeFactor;
        return data; 
    }
}

export interface IFileVm {
    serial?: number;
    fileName?: string | undefined;
    fileType?: FileType;
    fileSize?: number;
    fileSizeUnit?: FileSizeUnit;
    author?: string | undefined;
    dateCreated?: Date | undefined;
    isEncoded?: boolean;
    userCreated?: string | undefined;
    packageId?: number;
    sizeFactor?: number;
}

export enum FileType {
    PDF = 1,
    Jpg = 2,
    Pptx = 3,
    Xlsx = 4,
    Docs = 5,
}

export enum FileSizeUnit {
    Byte = 1,
    KB = 2,
    MB = 3,
    GB = 4,
}

export class SplitFileCommand implements ISplitFileCommand {
    file?: FileVm | undefined;

    constructor(data?: ISplitFileCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.file = _data["file"] ? FileVm.fromJS(_data["file"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SplitFileCommand {
        data = typeof data === 'object' ? data : {};
        let result = new SplitFileCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["file"] = this.file ? this.file.toJSON() : <any>undefined;
        return data; 
    }
}

export interface ISplitFileCommand {
    file?: FileVm | undefined;
}

export class GroupFilesCommand implements IGroupFilesCommand {
    files?: FileVm[] | undefined;

    constructor(data?: IGroupFilesCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["files"])) {
                this.files = [] as any;
                for (let item of _data["files"])
                    this.files!.push(FileVm.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GroupFilesCommand {
        data = typeof data === 'object' ? data : {};
        let result = new GroupFilesCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.files)) {
            data["files"] = [];
            for (let item of this.files)
                data["files"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IGroupFilesCommand {
    files?: FileVm[] | undefined;
}

export class SaveFilesCommand implements ISaveFilesCommand {
    files?: FileVm[] | undefined;

    constructor(data?: ISaveFilesCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["files"])) {
                this.files = [] as any;
                for (let item of _data["files"])
                    this.files!.push(FileVm.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SaveFilesCommand {
        data = typeof data === 'object' ? data : {};
        let result = new SaveFilesCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.files)) {
            data["files"] = [];
            for (let item of this.files)
                data["files"].push(item.toJSON());
        }
        return data; 
    }
}

export interface ISaveFilesCommand {
    files?: FileVm[] | undefined;
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}