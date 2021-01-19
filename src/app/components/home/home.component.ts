import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/models/heroe';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent {
	
	public heroes: Heroe[];
	public casas: any[];

	constructor( private heroesService: HeroesService ) { 
		this.heroesService.getAllHeroesOrHeroe().subscribe( heroes => this.heroes = heroes );
		this.heroesService.getCasas().subscribe( casas => this.casas = casas );
	}

}
