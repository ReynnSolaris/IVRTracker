import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IVRFormComponent } from './ivrform/ivrform.component';
import { EditivrComponent } from './editivr/editivr.component';
import { MainappComponent } from './mainapp/mainapp.component';

@NgModule({
  declarations: [
    AppComponent,
    IVRFormComponent,
    EditivrComponent,
    MainappComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
