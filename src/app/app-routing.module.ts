import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IVRFormComponent } from './ivrform/ivrform.component';
import { EditivrComponent } from './editivr/editivr.component';
import { MainappComponent } from './mainapp/mainapp.component';
import { AdminComponent } from './admin/admin.component';
import { ChangelogComponent } from './changelog/changelog.component';

const routes: Routes = [
  { path: '', component: MainappComponent},
  { path: 'editivr/:id', component: EditivrComponent},
  { path: 'changelog/:id', component: ChangelogComponent},
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
