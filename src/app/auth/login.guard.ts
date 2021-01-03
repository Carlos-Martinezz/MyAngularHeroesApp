import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginService } from '../services/login.service';

import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {

	constructor( private loginService: LoginService,
				 private router: Router ) {
	}

	canActivate() {
		if (!this.loginService.logueado) {
			Swal.fire({
				title: "Error!",
				text: "No has iniciado sesión, o la última sesión expiró.",
				icon: 'error',
			});
			this.router.navigate(['login']);
			return false;
		}
		return true;
	}

}
