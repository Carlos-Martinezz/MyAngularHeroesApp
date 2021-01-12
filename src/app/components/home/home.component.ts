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

	constructor( private heroesService: HeroesService ) { 
		this.heroesService.getAllHeroesOrHeroe().subscribe( heroes => {
			this.heroes = heroes;
		});
	}

	ngOnInit(): void {
	}

}
