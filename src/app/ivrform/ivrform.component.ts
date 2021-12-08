import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload/file-upload.service';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { MainappComponent } from '../mainapp/mainapp.component';
import { debounce, timer, delay  } from 'rxjs';
import { SettingsConf } from '../empstuff/settings';

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
    constructor(public fb: FormBuilder, private s:SettingsConf, private mapp:MainappComponent, private http:HttpClient, private fileUploadService: FileUploadService) { }

    ivrDebugForm = this.fb.group({
      ivrName: ['', [Validators.required]],
      ivrDescription: ['', [Validators.required]],
      ivrDepartment: ['', [Validators.required]],
      ivrContract: ['', [Validators.required]],
      ivrFile: ['', [Validators.required]],
      successMessage: [''],
      alert: [''],
    })

    onChangeDept(deptValue) {
      (this.ivrDebugForm.controls['ivrContract']).setValue('');
      //console.log(this.ivrDebugForm.controls['ivrDepartment'].value);
    }

    get contracts(): string[] | undefined {
      var contr = this.ivrDebugForm.controls['ivrDepartment'].value;
      return this.ctr.get(contr);
    }

    onChange(event) {
        this.file = event.target.files[0];
    }
    onUpload() {
        this.loading = !this.loading;
        var jsonData = JSON.stringify(this.ivrDebugForm.getRawValue());
        this.fileUploadService.upload(this.file, jsonData).subscribe(
            (objectRequest: any) => {
                if (typeof (objectRequest) === 'object') {
                    //this.shortLink = objectRequest.link;
                    //this.loading = false;
                    //
                    var res = JSON.stringify(objectRequest);
                    if(objectRequest.fallout === "alert-clear") {
                      this.mapp.addIVR(jsonData);
                      this.ivrDebugForm.reset();
                    }
                    this.ivrDebugForm.controls['successMessage'].setValue(objectRequest.message);
                    this.ivrDebugForm.controls['alert'].setValue(objectRequest.fallout);
                } else {
                  //this.ivrDebugForm.reset();
                  this.ivrDebugForm.controls['successMessage'].setValue(objectRequest);
                }
                setTimeout(() => {
                  this.ivrDebugForm.controls['successMessage'].setValue('');
                }, 2000);
            },
            error => {
              this.ivrDebugForm.controls['successMessage'].setValue('ERROR: Service Unreachable');
              this.ivrDebugForm.controls['alert'].setValue('alert-danger');
              setTimeout(() => {
                this.ivrDebugForm.controls['successMessage'].setValue('');
              }, 2000);
            }
        );
    }
    ngOnInit() {
      this.http.get(this.s.baseApiUrl + "/getdept").pipe(
      debounce(
        () => timer(1500))
      ).subscribe(
        (objectRequest: any) => {
          for(var i = 0; i < objectRequest.length; i++) {
            var obj = objectRequest[i];
            this.departmentsMap[obj.id] = obj.departmentName;
            this.departments[i] = obj.departmentName;
            this.ctr.set(obj.departmentName, []);
            //ivr.controls['id'].setValue(obj.id);
            //ivr.controls['ivrName'].setValue(obj.ivrName);
            //this.ivrsArray.push(ivr);
          }
        });


      this.http.get(this.s.baseApiUrl + "/getcontract").pipe(
      delay(500)
      ).subscribe(
        (objectRequest: any) => {
        for(var i = 0; i < objectRequest.length; i++) {
          var obj = objectRequest[i];
          var deptName = this.departmentsMap[obj.id];
          var ctrv2 = this.ctr.get(deptName) || [];
          var length = ctrv2['length'] || 0;
          ctrv2[length] = obj.contractName;
        }
      });
    }
}
