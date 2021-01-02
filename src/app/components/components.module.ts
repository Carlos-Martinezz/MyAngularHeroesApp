import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    HomeComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
