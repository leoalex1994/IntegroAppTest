/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Http, HttpHeaders, HttpOptions } from '@capacitor-community/http';
import { from } from 'rxjs';

const BasicAuth: HttpHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, /,charset=utf-8',
  'Authorization': 'Basic QVBLOj5HfUcvdzQ9VjZUcVN6Uw==',
};

@Injectable({
  providedIn: 'root',
})
export class NativeHttpService {
  constructor() { }

  doGet(url: string) {
    const options: HttpOptions = { url, method: 'GET', headers: BasicAuth };
    return from(Http.get(options));
  }

  doGetAut(url: string,heds:{}){
    const options: HttpOptions = { url, method: 'GET', headers: heds };
    return from(Http.get(options));
  }

  doPost(url: string, data?: any) {
    const options: HttpOptions = {
      url,
      method: 'POST',
      headers: BasicAuth,
      data,
    };
    return from(Http.post(options));
  }
}
