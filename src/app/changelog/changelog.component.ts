import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MainappComponent } from '../mainapp/mainapp.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsConf } from '../empstuff/settings';
import { EmployeeGrab } from '../empstuff/employeegrab';
@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements OnInit {
  ivrId: string;
  ivrEdit = this.fb.group({
    ivrName: ['', [Validators.required]],
    ivrDescription: ['', [Validators.required]],
    ivrChangelog: this.fb.array([ ])
  });


  newChangelog() {
    return this.fb.group({
      empId: [''],
      empName: [''],
      description: [''],
    })
  }

  public addChangelog(empId, empName, description) {
    var changeLog = this.newChangelog();
    changeLog.controls['empId'].setValue(empId);
    changeLog.controls['empName'].setValue(empName);
    changeLog.controls['description'].setValue(description);
    this.ivrChangelog.push(changeLog);
  }

  get ivrChangelog() {
    return this.ivrEdit.controls['ivrChangelog'] as FormArray;
  }

  get getLength() {
    return this.ivrEdit.controls['ivrChangelog'].value.length;
  }

  constructor(public fb: FormBuilder, private s:SettingsConf, public emp:EmployeeGrab, private http:HttpClient, private actRoute: ActivatedRoute) {
    this.ivrId = this.actRoute.snapshot.params['id'];
  }
  baseApiUrl = this.s.baseApiUrl;
  ngOnInit(): void {
    this.http.get(this.baseApiUrl + "/getivr/"+this.ivrId).subscribe(
      (objectRequest: any) => {
        this.ivrEdit.controls['ivrName'].setValue(objectRequest.ivrName);
        this.ivrEdit.controls['ivrDescription'].setValue(objectRequest.ivrDescription);
        var jsonData = JSON.parse(objectRequest.ivrChangelog);
        for (var i = 0; i < jsonData.length; i++) {
          this.addChangelog(jsonData[i]['empId'], "no info", jsonData[i]['description']);
        }
        //this.ivrEdit.controls['ivrChangelog'].setValue();
      });
  }

}
