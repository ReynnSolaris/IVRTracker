import {HttpClient, HttpHeaders} from '@angular/common/http';
import { SettingsConf } from './settings';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGrab {
  constructor(private http:HttpClient, private s:SettingsConf) { }
  baseApiUrl = this.s.baseApiUrl;
  grabEmp(id) {
    this.http.get(this.baseApiUrl + "/getemp/"+id).subscribe(
      (objectRequest: any) => {
        for(var i = 0; i < objectRequest.length; i++) {
          console.log(objectRequest[i])
          return objectRequest[i];
        }
      });
  }
}
