import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
	selector: 'app-crear-heroe',
	templateUrl: './crear-heroe.component.html',
	styleUrls: ['./crear-heroe.component.scss']
})
export class CrearHeroeComponent implements OnInit {

	public formGroup: FormGroup;
	private imagen: File;

	constructor( private formBuilder: FormBuilder,
				 private heroeService: HeroesService,
				 private datePipe: DatePipe ) { }

	ngOnInit(): void {
		this.buildForm();
	}

	/* Build Form */
	private buildForm() {

		this.formGroup = this.formBuilder.group({
			nombre: new FormControl( "", [ Validators.required, Validators.minLength( 3 ) ]), //NOMBRE
			biografia: new FormControl( "", [ Validators.required, Validators.minLength( 80 ) ]),
			imagen: new FormControl( "", [] ),
			aparicion: new FormControl( "", [ Validators.required ] ),
			casa: new FormControl( "", [ Validators.required ] )
		});

	}

	public changeArchivo( $event ) {

		$event.preventDefault();
		
		let reader = new FileReader();
		let imagen = $event.target.files[0];

		reader.readAsDataURL( imagen );
		
		reader.onloadend = () => {
			this.imagen = imagen;
		}

	}

	public enviar() {

		const formData = new FormData();
		
		let fechaAparicion = new Date( this.formGroup.get('aparicion').value );
		let fechaAparicionFormat =  this.datePipe.transform( fechaAparicion , "dd/MM/yyyy");

		formData.append('nombre', this.formGroup.get('nombre').value);
		formData.append('biografia', this.formGroup.get('biografia').value);
		formData.append('file', this.imagen);
		formData.append('aparicion', fechaAparicionFormat );
		formData.append('casa', this.formGroup.get('casa').value);

		this.heroeService.newHeroe( formData ).subscribe( data => this.formGroup.reset() );
		
	}

}
