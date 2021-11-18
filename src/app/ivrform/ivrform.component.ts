import { Component } from '@angular/core';
import { FileUploadService } from '../file-upload/file-upload.service';
import { FormsModule } from '@angular/forms';

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
    constructor(private fileUploadService: FileUploadService) { }

    ngOnInit(): void {
    }

    onChange(event) {
        this.file = event.target.files[0];
    }
    onUpload() {
        this.loading = !this.loading;
        console.log(this.file);
        this.fileUploadService.upload(this.file).subscribe(
            (leftnut: any) => {
                if (typeof (leftnut) === 'object') {
                    this.shortLink = leftnut.link;
                    this.loading = false;
                }
            }
        );
    }
}
