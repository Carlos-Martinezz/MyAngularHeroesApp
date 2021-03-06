import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Guards */
import { LoginGuard } from './auth/login.guard';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { CrearHeroeComponent } from './components/crear-heroe/crear-heroe.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';

/* Components */
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { SigninComponent } from './components/signin/signin.component';
import { VerMasComponent } from './components/ver-mas/ver-mas.component';

const ROUTES: Routes = [
	{ path: "", component: BienvenidoComponent },
	{ path: "login", component: LoginComponent },
	{ path: "signin", component: SigninComponent },
	{ path: "home", component: HomeComponent, canActivate: [ LoginGuard ] },
	{ path: "verMas/:id", component: VerMasComponent, canActivate: [ LoginGuard ] },
	{ path: "crearHeroe", component: CrearHeroeComponent, canActivate: [ LoginGuard ] },
	{ path: "crearHeroe/:id", component: CrearHeroeComponent, canActivate: [ LoginGuard ] }, /* Sirve para actualizar un héroe, con el mismo FORM */
	{ path: "cuenta", component: CuentaComponent, canActivate: [ LoginGuard ] },
	{ path: '**', component: NoEncontradoComponent, pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forRoot( ROUTES, { useHash: true } )
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }