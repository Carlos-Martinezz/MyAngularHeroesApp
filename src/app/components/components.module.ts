import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';
import { VerMasComponent } from './ver-mas/ver-mas.component';
import { ImagenPipe } from '../pipes/imagen.pipe';
import { CrearHeroeComponent } from './crear-heroe/crear-heroe.component';


@NgModule({
  declarations: [
    HomeComponent, 
    LoginComponent, 
    VerMasComponent,
    ImagenPipe,
    CrearHeroeComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class ComponentsModule { }
