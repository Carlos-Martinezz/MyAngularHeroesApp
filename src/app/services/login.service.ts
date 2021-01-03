import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	public logueado: boolean;
	private urlBase: string = "http://192.168.1.5:8080/heroes-api";

	constructor( private http: HttpClient,
				 private router: Router ) { 
		this.logueado = false;
	}

	validarSesion() {

		const token = localStorage.getItem("usuarioToken");
		const expiracion = new Date( Date.parse(localStorage.getItem("expiracion")) );
		const fechaActual = new Date();

		if( token !== null && expiracion !== null ) {

			if( fechaActual >= expiracion ) {
				this.logueado = false;
				this.logout();
				console.log("El token venció");
			} else {

				this.logueado = true;
				this.router.navigate(['home']);

				console.log("Token aun no vence: ");
				console.log("Expiracion: ", expiracion);
				console.log("FechaActual: ", fechaActual );
			}

		} else {
			this.logueado = false;
		}

	}

	login( usuario: string, contrasena: string ): Observable<any> {

		const params = new HttpParams()
			.set( 'usuario', usuario )
			.set( 'contrasena', contrasena );

		return this.http.post( `${ this.urlBase }/login`, params )
						.pipe( 
							tap( data => {
									let token = data[ 'token' ];
									let tokenDecode = jwt_decode( data[ 'token' ] )
									
									const fechaExpiracion = new Date( 0 ); 
									fechaExpiracion.setUTCSeconds( tokenDecode['exp'] );

									localStorage.setItem("usuarioToken", token );
									localStorage.setItem("expiracion", fechaExpiracion.toString() );

									this.logueado = true;
									this.router.navigate(['home']); 

									console.log( token );
									console.log( fechaExpiracion );
								},
								err => {
									Swal.fire({
										title: "Error!" ,
										text: `${err['error'].token}.`,
										icon: 'error',
									});
								}
							)
							
						);
		
	}

	logout() {
		localStorage.removeItem("usuarioToken");
		localStorage.removeItem("expiracion");
	}

}
