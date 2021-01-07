import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-crear-heroe',
	templateUrl: './crear-heroe.component.html',
	styleUrls: ['./crear-heroe.component.scss']
})
export class CrearHeroeComponent implements OnInit {

	public formGroup: FormGroup;

	constructor( private formBuilder: FormBuilder ) { }

	ngOnInit(): void {
		this.buildForm();
	}

	private buildForm() {


		this.formGroup = this.formBuilder.group({
			nombre: [ "", Validators.required ],
			biografia: [ "", Validators.required ],
			imagen: [ "" ],
			aparicion: [ "", Validators.required ],
			casa: [ "", Validators.required ]
		});

	}

	public enviar() {
		console.log( this.formGroup.value );
	}

}
