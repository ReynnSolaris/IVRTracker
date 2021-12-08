import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { SettingsConf } from '../empstuff/settings';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http:HttpClient, private s:SettingsConf) { }

  baseApiUrl = this.s.baseApiUrl;

  // Returns an observable
  upload(file, jsonData):Observable<any> {
    if (file && jsonData) {
      // Create form data
      const formData = new FormData();
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'form-data');
      const httpOptions = {
        headers: headers
      }
      // Store form name as "file" with file data
      formData.append("file", file, file.name);
      formData.append("json", jsonData)
      // Make http post request over api
      // with formData as req
      return this.http.post(this.baseApiUrl+"/addivr", formData, httpOptions)
    } else {
      return this.http.post("", new FormData());
    }
  }
}
