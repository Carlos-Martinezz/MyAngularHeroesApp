import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public formGroup: FormGroup;

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.buildForm();
	}

	private buildForm() {

		const usuario = "";

		this.formGroup = this.formBuilder.group({
			usuario: [ usuario, Validators.required ],
			contrasena: [ "", Validators.required ]
		});
	}

	public enviar() {
		const usuario: string = this.formGroup.value.usuario;

		console.log( usuario );
	}

}
