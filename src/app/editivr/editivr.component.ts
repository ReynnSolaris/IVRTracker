import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editivr',
  templateUrl: './editivr.component.html',
  styleUrls: ['./editivr.component.css']
})
export class EditivrComponent {
  ivrId: string;
  constructor(private actRoute: ActivatedRoute) {
      this.ivrId = this.actRoute.snapshot.params['id'];
    }

}
