import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MainappComponent } from '../mainapp/mainapp.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  ivrId: string;
  ivrEdit = this.fb.group({
    ivrName: ['', [Validators.required]],
    ivrDescription: ['', [Validators.required]],
    ivrChangelog: this.fb.array([ ])
  });
  baseApiUrl = "http://localhost:64643/"

  newChangelog() {
    return this.fb.group({
      empId: [''],
      description: [''],
    })
  }

  public addChangelog(empId, description) {
    var changeLog = this.newChangelog();
    changeLog.controls['empId'].setValue(empId);
    changeLog.controls['description'].setValue(description);
    this.ivrChangelog.push(changeLog);
  }

  get ivrChangelog() {
    return this.ivrEdit.controls['ivrChangelog'] as FormArray;
  }

  get getLength() {
    return this.ivrEdit.controls['ivrChangelog'].value.length;
  }

  constructor(public fb: FormBuilder, private http:HttpClient, private actRoute: ActivatedRoute) {
    this.ivrId = this.actRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.http.get(this.baseApiUrl + "/globalchangelog/").subscribe(
      (objectRequest: any) => {
        console.log(objectRequest);
        for (var i = 0; i < objectRequest.length; i++) {
          this.addChangelog(objectRequest[i]['empId'], objectRequest[i]['description']);
        }
        //this.ivrEdit.controls['ivrChangelog'].setValue();
      });
  }

}
