import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from 'src/app/models/heroe';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
	selector: 'app-ver-mas',
	templateUrl: './ver-mas.component.html',
	styleUrls: ['./ver-mas.component.scss']
})
export class VerMasComponent implements OnInit {

	public heroe: Heroe = {
		id: null,
		nombre: null,
		biografia: null,
		rutaImagen: null,
		aparicion: null,
		casa: null,
	};

	private id: number;

	constructor( private activatedRoute: ActivatedRoute,
				 private heroesService: HeroesService ) {
		activatedRoute.params.subscribe( param => {
			this.id = param.id;
			this.heroesService.getHeroe( this.id ).subscribe( heroe => this.heroe = heroe );
		});
	}

	ngOnInit(): void {
		
	}

}
