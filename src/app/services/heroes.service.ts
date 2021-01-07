import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Heroe } from '../models/heroe';

@Injectable({
	providedIn: 'root'
})
export class HeroesService {

	private urlBase: string = environment.API_URL;

	constructor( private http: HttpClient ) { 
		
	}

	/* Obtener todos los héroes */
	getAllHeroes(): Observable<Heroe[]> {
		return this.http.get<Heroe[]>( `${ this.urlBase }/getAll` );
	};

	/* Obtener un héroe */
	getHeroe( id: number ): Observable<Heroe> {
		return this.http.get<Heroe>( `${ this.urlBase }/getHeroe/${ id }` );
	}

}
