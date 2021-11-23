import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IVRFormComponent } from './ivrform/ivrform.component';
import { EditivrComponent } from './editivr/editivr.component';
import { MainappComponent } from './mainapp/mainapp.component';

const routes: Routes = [
  { path: '', component: MainappComponent},
  { path: 'editivr/:id', component: EditivrComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
