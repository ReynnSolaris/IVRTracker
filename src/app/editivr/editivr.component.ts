import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MainappComponent } from '../mainapp/mainapp.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SettingsConf } from '../empstuff/settings';
@Component({
  selector: 'app-editivr',
  templateUrl: './editivr.component.html',
  styleUrls: ['./editivr.component.css']
})
export class EditivrComponent implements OnInit {
  ivrId: string;
  IVREdit = this.fb.group({
    ivrName: ['', [Validators.required]],
    ivrDescription: ['', [Validators.required]],
    ivrNotes: ['', [Validators.required]],
    ivrChangelog: this.fb.array([ ])
  });


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

  constructor(public fb: FormBuilder, private s:SettingsConf, private datepipe: DatePipe, private router:Router, private http:HttpClient, private actRoute: ActivatedRoute) {
      this.ivrId = this.actRoute.snapshot.params['id'];
    }
      baseApiUrl = this.s.baseApiUrl;
    onUpdate() {
      const formData = new FormData();
      var date = new Date();
    //  let latest_date = this.datepipe.transform(date, 'yyyy-MM-dd | HH:mm:ss zzz');
      //this.addChangelog(58582, "Edited the IVR ("+this.ivrId+") at "+latest_date);
      //var jsonData = JSON.stringify(this.IVREdit.getRawValue());
      //formData.append("json", jsonData);
      // Make http post request over api
      // with formData as req
      this.http.post(this.baseApiUrl + "/updateivr/"+this.ivrId, formData).subscribe();
      return this.router.navigate(['']);
    }

    ngOnInit() {
      this.http.get(this.baseApiUrl + "/getivr/"+this.ivrId).subscribe(
        (objectRequest: any) => {
          this.IVREdit.controls['ivrName'].setValue(objectRequest.ivrName);
          this.IVREdit.controls['ivrDescription'].setValue(objectRequest.ivrDescription);
          this.IVREdit.controls['ivrNotes'].setValue(objectRequest.ivrNotes);
          var jsonData = JSON.parse(objectRequest.ivrChangelog);
          for (var i = 0; i < jsonData.length; i++) {
            this.addChangelog(jsonData[i]['empId'], jsonData[i]['description']);
          }
          //this.IVREdit.controls['ivrChangelog'].setValue();
        });
    }

    get ivrChangelog() {
      return this.IVREdit.controls['ivrChangelog'] as FormArray;
    }
}
