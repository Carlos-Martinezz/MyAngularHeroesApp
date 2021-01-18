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
import { SigninComponent } from './signin/signin.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';


@NgModule({
  declarations: [
    HomeComponent, 
    LoginComponent, 
    VerMasComponent,
    ImagenPipe,
    CrearHeroeComponent,
    SigninComponent,
    BienvenidoComponent,
    NoEncontradoComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class ComponentsModule { }
