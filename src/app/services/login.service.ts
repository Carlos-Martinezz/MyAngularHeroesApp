import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import jwt_decode from "jwt-decode";

import { Alerts } from '../utils/alerts.utils';
import { environment } from 'src/environments/environment';
import { Heroe } from '../models/heroe';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	private urlBase: string = environment.API_URL;
	public show: boolean;
	private token: string; 

	constructor( private http: HttpClient,
				 private router: Router,
				 private alerts: Alerts ) { 
		this.show = false;
	}

	validarSesion(): boolean {

		const token = localStorage.getItem( "usuarioToken" );
		const expiracion = new Date( Date.parse(localStorage.getItem( "expiracion" )) );
		const fechaActual = new Date();

		if( token !== null && expiracion !== null ) {

			if( fechaActual >= expiracion ) {

				this.alerts.alerta( "Error!", "La sesión expiró. Por favor, inicia sesión de nuevo.", 'error' );

				this.show = false;
				localStorage.removeItem( "usuarioToken" );
				localStorage.removeItem( "expiracion" );

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

									localStorage.setItem( "usuarioToken", token );
									localStorage.setItem( "expiracion", fechaExpiracion.toString() );

									this.show = true;
									this.alerts.alerta( "Hecho!", "Se inició la sesión.", 'success', 2000 );
									this.router.navigate([ 'home' ]); 
									
								},
								err => {
									this.alerts.alerta( "Error!", `${err['error'].token}.`, 'error' );
								}
							)
						);

	}

	signin( usuario: string, contrasena: string ): Observable<any> {

		const params = new HttpParams()
				.set( 'usuario', usuario )
				.set( 'contrasena', contrasena );

		return this.http.post<Heroe>( `${ this.urlBase }/crearUsuario`, params )
						.pipe( 
							tap( data => {
									console.log( data.usuario )
									this.alerts.alerta( "Hecho!", `Se creó el usuario: ${ data.usuario }`, 'success' ); 
									
								},
								err => {
									this.alerts.alerta( "Error!", `${ err.error.token }`, 'error' );
								}
							)
						);
	}

	logout() {

		localStorage.removeItem( "usuarioToken" );
		localStorage.removeItem( "expiracion" );

		this.alerts.alerta( "Hecho!", "Se cerró la sesión.", 'success', 2000 );
		this.router.navigate([ 'login' ]);

	}

	getToken(): string {

		this.token = localStorage.getItem( "usuarioToken" );
		return this.token;

	}

}
