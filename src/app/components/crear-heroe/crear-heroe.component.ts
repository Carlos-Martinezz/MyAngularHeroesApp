import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from 'src/app/models/heroe';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
	selector: 'app-crear-heroe',
	templateUrl: './crear-heroe.component.html',
	styleUrls: ['./crear-heroe.component.scss']
})
export class CrearHeroeComponent implements OnInit {

	public id: number = null;
	public heroe: Heroe;

	public datosFormulario = {
		nombreBoton: "Crear",
		colorBoton: "primary",
		titulo: "Crear un héroe"
	};

	public formGroup: FormGroup;
	private imagen: File;

	constructor( private formBuilder: FormBuilder,
				 private activatedRoute: ActivatedRoute,
				 private heroesService: HeroesService,
				 private datePipe: DatePipe ) { 

		activatedRoute.params.subscribe( param => {

			if( param.id ) {

				/* Cambiamos el aspecto del formulario */
				this.id = param.id;
				this.datosFormulario.nombreBoton = "Actualizar";
				this.datosFormulario.colorBoton = "success";
				this.datosFormulario.titulo = " Actualizar un héroe";

				/* 
					Esperamos la llamada al serivicio 
					y una vez obtenido seteamos los datos.
				*/
				this.heroesService.getAllHeroesOrHeroe( this.id ).subscribe( heroe => {

					this.heroe = heroe;
					let fechaAparicionFormat =  this.datePipe.transform( heroe.aparicion , "yyyy-MM-dd");

					this.formGroup.get( "nombre" ).setValue( heroe.nombre );
					this.formGroup.get( "biografia" ).setValue( heroe.biografia );
					this.formGroup.get( "aparicion" ).setValue( fechaAparicionFormat );
					this.formGroup.get( "casa" ).setValue( heroe.casa );

				});
			}

		});

	}

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

	/* Detectamos cambios en el campo de la imagen, y la cargamos */
	public changeArchivo( $event ) {

		$event.preventDefault();
		
		let reader = new FileReader();
		let imagen = $event.target.files[0];

		reader.readAsDataURL( imagen );
		
		reader.onloadend = () => {
			this.imagen = imagen;
		}

	}

	/* Enviamos todos los datos para guardar */
	public enviar() {

		if( this.id ) {

			this.heroe = {
				id: this.id,
				nombre: this.formGroup.get( 'nombre' ).value,
				biografia: this.formGroup.get( 'biografia' ).value,
				aparicion: this.convertirFecha( this.formGroup.get( 'aparicion' ).value ),
				rutaImagen: "",
				casa: this.formGroup.get( 'casa' ).value
			};

			this.heroesService.updateHeroe( this.heroe ).subscribe();
			
			return;
		}

		const formData = new FormData();

		formData.append('nombre', this.formGroup.get( 'nombre' ).value);
		formData.append('biografia', this.formGroup.get( 'biografia' ).value);
		formData.append('file', this.imagen);
		formData.append('aparicion', this.convertirFecha( this.formGroup.get( 'aparicion' ).value ) );
		formData.append('casa', this.formGroup.get( 'casa' ).value);

		this.heroesService.newHeroe( formData ).subscribe( data => this.formGroup.reset() );
		
	}

	/* Convertir dd/MM/yyyy */
	private convertirFecha( fecha: string ): any {
		return this.datePipe.transform(fecha , "dd/MM/yyyy");
	}

}
