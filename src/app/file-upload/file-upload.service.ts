import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // API url
  baseApiUrl = "http://localhost:64643/Test"

  constructor(private http:HttpClient) { }

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
      return this.http.post(this.baseApiUrl, formData, httpOptions)
    } else {
      return this.http.post("", new FormData());
    }
  }
}
