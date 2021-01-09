import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
				 private alerts: Alerts,
				 private router: Router ) { 
		
	}

	getAllHeroesOrHeroe( id?: number ): Observable<any> {
		
		let heroe: Heroe;
		let heroes: Heroe[]; 

		let response = id ? heroe : heroes;

		return this.http.get<typeof response>( id ? `${ this.urlBase }/getHeroe/${ id }` : `${ this.urlBase }/getAll`)
						.pipe(
							tap( 
								data => data,
								err => {
									this.alerts.alerta( "Lo sentimos!", "Parece que el servicio no está disponible en estos momentos.", 'error');
								}
							)
						);

	}

	newHeroe( formData: FormData ): Observable<any> {
				
		return this.http.post( `${ this.urlBase }/saveHeroe`, formData, { responseType:'text' } )
						.pipe(
							tap(
								data => { 
									this.alerts.alerta( "Hecho!", `${ data }.`, 'success');
								},
								err => {
									this.alerts.alerta( "Error!", "Ocurrió un error al guardar el héroe", 'error');
								}
							)
						);
		
	}

	deleteHeroe( id: number ): Observable<Heroe> {

		return this.http.delete<Heroe>(`${ this.urlBase }/deleteHeroe/${ id }`)
						.pipe(
							tap(
								heroeRes => {
									this.alerts.alerta( "Hecho!", `Se eliminó el héroe: ${ heroeRes.nombre }`, 'success');
									this.router.navigate(['/home']);
								},
								err => this.alerts.alerta( "Error!", "No se pudo eliminar el héroe", 'error')
							)
						);

	}

}
