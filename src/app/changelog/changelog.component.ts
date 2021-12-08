import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MainappComponent } from '../mainapp/mainapp.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.http.get(this.baseApiUrl + "/getivr/"+this.ivrId).subscribe(
      (objectRequest: any) => {
        this.ivrEdit.controls['ivrName'].setValue(objectRequest.ivrName);
        this.ivrEdit.controls['ivrDescription'].setValue(objectRequest.ivrDescription);
        var jsonData = JSON.parse(objectRequest.ivrChangelog);
        for (var i = 0; i < jsonData.length; i++) {
          this.addChangelog(jsonData[i]['empId'], jsonData[i]['description']);
        }
        //this.ivrEdit.controls['ivrChangelog'].setValue();
      });
  }

}
