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
  IVREdit = this.fb.group({
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
    return this.IVREdit.controls['ivrChangelog'] as FormArray;
  }

  get getLength() {
    return this.IVREdit.controls['ivrChangelog'].value.length;
  }

  constructor(public fb: FormBuilder, private http:HttpClient, private actRoute: ActivatedRoute) {
    this.ivrId = this.actRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.http.get(this.baseApiUrl + "/getivr/"+this.ivrId).subscribe(
      (leftnut: any) => {
        this.IVREdit.controls['ivrName'].setValue(leftnut.ivrName);
        this.IVREdit.controls['ivrDescription'].setValue(leftnut.ivrDescription);
        var jsonData = JSON.parse(leftnut.ivrChangelog);
        for (var i = 0; i < jsonData.length; i++) {
          this.addChangelog(jsonData[i]['empId'], jsonData[i]['description']);
        }
        //this.IVREdit.controls['ivrChangelog'].setValue();
      });
  }

}
