import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/models/heroe';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	public heroes: Heroe[];

	constructor( private heroeService: HeroesService ) { 
		this.heroeService.getAllHeroes().subscribe( heroes => {
			this.heroes = heroes;
			console.log( this.heroes );
		});
		
	}

	ngOnInit(): void {
	}

}
