import { Component } from '@angular/core';
import { FileUploadService } from '../file-upload/file-upload.service';
import { FormsModule, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MainappComponent } from '../mainapp/mainapp.component';

@Component({
  selector: 'app-ivrform',
  templateUrl: './ivrform.component.html',
  styleUrls: ['./ivrform.component.css']
})
export class IVRFormComponent {
  title = 'OutageIVRTracker';
    shortLink: string = "";
    loading: boolean = false;
    file: File;
    departments: any = ["IT Department", "Testing Environment", "MSO"]
    ctr = new Map<string, string[]>([
      ['IT Department', ['test']],
      ["MSO", ["Texas.gov CHD"]]
    ])
    constructor(public fb: FormBuilder, private mapp:MainappComponent, private fileUploadService: FileUploadService) { }

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
      return this.ctr.get(this.IVRDebugForm.controls['ivrDepartment'].value);
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
                    //this.IVRDebugForm.reset();
                    var res = JSON.stringify(leftnut);
                    this.mapp.addIVR(jsonData);
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
}
