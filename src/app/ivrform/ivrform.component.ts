import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload/file-upload.service';
import { FormsModule, FormBuilder } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Validators } from '@angular/forms';
import { MainappComponent } from '../mainapp/mainapp.component';
import { debounce, timer } from 'rxjs';

@Component({
  selector: 'app-ivrform',
  templateUrl: './ivrform.component.html',
  styleUrls: ['./ivrform.component.css']
})
export class IVRFormComponent implements OnInit  {
  title = 'OutageIVRTracker';
    shortLink: string = "";
    loading: boolean = false;
    file: File;
    departments: any = []
    departmentsMap = new Map<string, string>([

    ])
    ctr = new Map<string, string[]>([

    ])
    constructor(public fb: FormBuilder, private mapp:MainappComponent, private http:HttpClient, private fileUploadService: FileUploadService) { }

    IVRDebugForm = this.fb.group({
      ivrName: ['', [Validators.required]],
      ivrDescription: ['', [Validators.required]],
      ivrDepartment: ['', [Validators.required]],
      ivrContract: ['', [Validators.required]],
      ivrFile: ['', [Validators.required]],
      successMessage: [''],
      alert: [''],
    })

    onChangeDept(deptValue) {
      (this.IVRDebugForm.controls['ivrContract']).setValue('');
      //console.log(this.IVRDebugForm.controls['ivrDepartment'].value);
    }

    get contracts(): string[] | undefined {
      var contr = this.IVRDebugForm.controls['ivrDepartment'].value;
      return this.ctr.get(contr);
    }

    onChange(event) {
        this.file = event.target.files[0];
    }
    onUpload() {
        this.loading = !this.loading;
        var jsonData = JSON.stringify(this.IVRDebugForm.getRawValue());
        this.fileUploadService.upload(this.file, jsonData).subscribe(
            (leftnut: any) => {
              console.log(leftnut);
                if (typeof (leftnut) === 'object') {
                    //this.shortLink = leftnut.link;
                    //this.loading = false;
                    //
                    var res = JSON.stringify(leftnut);
                    if(leftnut.fallout === "alert-clear") {
                      this.mapp.addIVR(jsonData);
                      this.IVRDebugForm.reset();
                    }
                    this.IVRDebugForm.controls['successMessage'].setValue(leftnut.message);
                    this.IVRDebugForm.controls['alert'].setValue(leftnut.fallout);
                } else {
                  //this.IVRDebugForm.reset();
                  this.IVRDebugForm.controls['successMessage'].setValue(leftnut);
                }
                setTimeout(() => {
                  this.IVRDebugForm.controls['successMessage'].setValue('');
                }, 2000);
            },
            error => {
              this.IVRDebugForm.controls['successMessage'].setValue('ERROR: Service Unreachable');
              this.IVRDebugForm.controls['alert'].setValue('alert-danger');
              setTimeout(() => {
                this.IVRDebugForm.controls['successMessage'].setValue('');
              }, 2000);
            }
        );
    }

    ngOnInit() {
      this.http.get(this.mapp.baseApiUrl + "/getdept").pipe(
      debounce(
        () => timer(1000))
      ).subscribe(
        (leftnut: any) => {
          for(var i = 0; i < leftnut.length; i++) {
            var obj = leftnut[i];
            this.departmentsMap[obj.id] = obj.departmentName;
            this.departments[i] = obj.departmentName;
            this.ctr.set(obj.departmentName, []);
            //ivr.controls['id'].setValue(obj.id);
            //ivr.controls['ivrName'].setValue(obj.ivrName);
            //this.ivrsArray.push(ivr);
          }
        });
      this.http.get(this.mapp.baseApiUrl + "/getcontract").pipe(
      debounce(
        () => timer(1000))
      ).subscribe(
        (leftnut: any) => {
        for(var i = 0; i < leftnut.length; i++) {
          var obj = leftnut[i];
          var deptName = this.departmentsMap[obj.id];
          var ctrv2 = this.ctr.get(deptName) || [];
          var length = ctrv2['length'] || 0;
          ctrv2[length] = obj.contractName;
        }
      });
    }
}
