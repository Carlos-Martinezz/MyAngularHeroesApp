import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

import { environment } from 'src/environments/environment';
import { Heroe } from '../models/heroe';
import { Alerts } from '../utils/alerts.utils';

@Injectable({
	providedIn: 'root'
})
export class HeroesService {

	private urlBase: string = environment.API_URL;

	constructor( private http: HttpClient,
				 private alerts: Alerts ) { 
		
	}

	/* Obtener todos los héroes */
	getAllHeroes(): Observable<Heroe[]> {
		return this.http.get<Heroe[]>( `${ this.urlBase }/getAll` )
						.pipe(
							tap( 
								data => data,
								err => {
									this.alerts.alerta( "Lo sentimos!", "Parece que el servicio no está disponible en estos momentos.", 'error');
									console.log( err );
								}
							)
						);
	};

	/* Obtener un héroe */
	getHeroe( id: number ): Observable<Heroe> {
		return this.http.get<Heroe>( `${ this.urlBase }/getHeroe/${ id }` )
						.pipe(
							tap( 
								data => data,
								err => {
									this.alerts.alerta( "Lo sentimos!", "Parece que el servicio no está disponible en estos momentos.", 'error');
									console.log( err );
								}
							)
						);
	}

}
