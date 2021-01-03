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

	public show: boolean;
	private urlBase: string = "http://192.168.1.5:8080/heroes-api";

	constructor( private http: HttpClient,
				 private router: Router ) { 
		this.show = false;
	}

	validarSesion(): boolean {

		const token = localStorage.getItem("usuarioToken");
		const expiracion = new Date( Date.parse(localStorage.getItem("expiracion")) );
		const fechaActual = new Date();

		if( token !== null && expiracion !== null ) {
			if( fechaActual >= expiracion ) {
				/* Swal.fire({
					title: "Error!",
					text: "La sesión expiró. Por favor, inicia sesión de nuevo.",
					icon: 'error',
				}); */
				this.show = false;
				localStorage.removeItem("usuarioToken");
				localStorage.removeItem("expiracion");
				return false;
			} else {
				this.show = true;
				return true;
			}
		} else {
			this.show = false;
			return false;
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

									this.show = true;
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

}
