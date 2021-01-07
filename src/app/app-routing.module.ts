import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Guards */
import { LoginGuard } from './auth/login.guard';

/* Components */
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { VerMasComponent } from './components/ver-mas/ver-mas.component';

const ROUTES: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [ LoginGuard ] },
  { path: "verMas/:id", component: VerMasComponent, canActivate: [ LoginGuard ] },
  { path: '**',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: true } )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }