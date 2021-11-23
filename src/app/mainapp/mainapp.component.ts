import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mainapp',
  templateUrl: './mainapp.component.html',
  styleUrls: ['./mainapp.component.css']
})
export class MainappComponent implements OnInit {



  constructor(private http:HttpClient, private fb:FormBuilder) { }

  ivrTableForm = this.fb.group({
    ivrsArray: this.fb.array([
    ])
  })

  newIVR() {
    return this.fb.group({
      id: [''],
      ivrName: [''],
      ivrDepartment: [''],
      ivrContract: [''],
      ivrDescription: [''],
      ivrEnabled: [''],
    })
  }
  get ivrsArray() {
    return this.ivrTableForm.controls['ivrsArray'] as FormArray;
  }

  baseApiUrl = "http://localhost:64643/"
  defaultIVRs = [
    {
      id: "3751384a-1743",
      ivrName: "Testing IVR",
      ivrDepartment: "MSO",
      ivrContract: "Texas.gov CHD",
      ivrDescription: "This IVR Has been added by system.administrator",
      ivrEnabled: true
    },
    {
      id: "c56178d4-5866",
      ivrName: "Outage for PBI55035",
      ivrDepartment: "TSR Barnes",
      ivrContract: "Consolidated Res",
      ivrDescription: "This IVR Has been added by system.administrator",
      ivrEnabled: false
    }
  ]

  deleteIVR(id, index) {
    this.http.delete(this.baseApiUrl + "/deleteivr/"+id).subscribe();
    this.ivrsArray.removeAt(index);
  }

  updateIVRState(id, index) {
    this.http.post(this.baseApiUrl + "/toggleivr/"+id, null).subscribe();
    var box = (this.ivrsArray.at(index) as FormGroup);
    if (box.controls['ivrEnabled'].value == 1) {
      //box.value['ivrEnabled'].setValue(0);
      box.controls['ivrEnabled'].setValue(0);
      console.log('toggled off | ');
    } else {
      box.controls['ivrEnabled'].setValue(1);
      console.log('toggled on');
    //  box.value['ivrEnabled'].setValue(1);
    }
  }

  public addIVR(obj) {
    var ivr = this.newIVR();
    obj = JSON.parse(obj);
    ivr.controls['id'].setValue(obj.id);
    ivr.controls['ivrName'].setValue(obj.ivrName);
    ivr.controls['ivrDepartment'].setValue(obj.ivrDepartment);
    ivr.controls['ivrContract'].setValue(obj.ivrContract);
    ivr.controls['ivrDescription'].setValue(obj.ivrDescription);
    ivr.controls['ivrEnabled'].setValue(1);
    this.ivrsArray.push(ivr);
  }

  ngOnInit(): void {
    this.http.get(this.baseApiUrl + "/getallivrs").subscribe(
      (leftnut: any) => {
        for(var i = 0; i < leftnut.length; i++) {
          var obj = leftnut[i];
          var ivr = this.newIVR();
          ivr.controls['id'].setValue(obj.id);
          ivr.controls['ivrName'].setValue(obj.ivrName);
          ivr.controls['ivrDepartment'].setValue(obj.ivrDepartment);
          ivr.controls['ivrContract'].setValue(obj.ivrContract);
          ivr.controls['ivrDescription'].setValue(obj.ivrDescription);
          ivr.controls['ivrEnabled'].setValue(obj.ivrEnabled);
          this.ivrsArray.push(ivr);
        }
        this.defaultIVRs = leftnut;

      });
  }

}
