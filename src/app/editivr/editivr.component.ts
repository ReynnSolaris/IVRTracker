import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MainappComponent } from '../mainapp/mainapp.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  baseApiUrl = "http://localhost:64643/"
  constructor(public fb: FormBuilder, private http:HttpClient, private actRoute: ActivatedRoute) {
      this.ivrId = this.actRoute.snapshot.params['id'];
    }
    onUpdate() {

    }

    ngOnInit() {
      this.http.get(this.baseApiUrl + "/getivr/"+this.ivrId).subscribe(
        (leftnut: any) => {
          console.log(leftnut);
          this.IVREdit.controls['ivrName'].setValue(leftnut.ivrName);
          this.IVREdit.controls['ivrDescription'].setValue(leftnut.ivrDescription);
          this.IVREdit.controls['ivrNotes'].setValue(leftnut.ivrNotes);
          //this.defaultIVRs = leftnut;

        });
    }

    get ivrChangelog() {
      return this.IVREdit.controls['ivrChangelog'] as FormArray;
    }
}
