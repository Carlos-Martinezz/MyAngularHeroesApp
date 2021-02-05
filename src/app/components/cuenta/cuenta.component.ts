import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-cuenta',
	templateUrl: './cuenta.component.html'
})
export class CuentaComponent implements OnInit {

	public formGroup: FormGroup;

	constructor( private formBuilder: FormBuilder,
				 private loginService: LoginService ) {  
		
	}

	ngOnInit(): void {
		this.buildForm();
	}

	private buildForm() {

		this.formGroup = this.formBuilder.group({
			usuario: [ "", Validators.required ],
			contrasena: [ "", Validators.required ],
			nueva: [ "", Validators.required]
		});

	}

	public enviar() {

		const usuario: string = this.formGroup.value.usuario;
		const contrasena: string = this.formGroup.value.contrasena;
		const nueva: string = this.formGroup.value.nueva;

		if( usuario === '' || contrasena === '' || nueva === '' ) {
			return;
		}

		this.loginService.actualizarUsuario(usuario, contrasena, nueva).subscribe(
			data => this.formGroup.reset(),
			err => console.log( err )
		);
		
	}

}
