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
		const token = localStorage.getItem("usuarioToken");
		const expiracion = new Date( Date.parse(localStorage.getItem("expiracion")) );
		const fechaActual = new Date();

		if( token !== null && expiracion !== null ) {
			console.log("Actual: ", fechaActual );
			console.log("Expira: ", expiracion );
			if( fechaActual >= expiracion ) {
				Swal.fire({
					title: "Error!",
					text: "La sesión expiró. Por favor, inicia sesión de nuevo.",
					icon: 'error',
				});
				localStorage.removeItem("usuarioToken");
				localStorage.removeItem("expiracion");
				this.loginService.show = false;
				this.router.navigate(['login']);
				return false;
			} else {
				this.loginService.show = true;
				return true;
			}
		} else {
			
			Swal.fire({
				title: "Error!",
				text: "Debes iniciar sesión.",
				icon: 'error',
			});
			this.loginService.show = false;
			this.router.navigate(['login']);
			return false;
		}
		
	}

}
