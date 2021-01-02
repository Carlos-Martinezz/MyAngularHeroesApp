import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	public logueado: boolean;

	constructor() { 
		this.logueado = false;
	}

}
