import { Component } from '@angular/core';
import { Heroe } from 'src/app/models/heroe';
import { HeroesService } from 'src/app/services/heroes.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

	public busqueda: string = "";
	public heroes: Heroe[] = [];
		
	constructor( public loginService: LoginService, 
				 private heroesService: HeroesService ) {

	}

	logout() {
		this.loginService.logout();
	}

	buscarHeroes() {

		let nombre = this.busqueda.trim();
		
		if( nombre !== "" && nombre.length > 0 ) {
			this.heroesService.getHeroesForName( nombre ).subscribe( heroes => this.heroes = heroes );
		} else {
			this.heroes = [];
		}
		
		return;	
	}

}
