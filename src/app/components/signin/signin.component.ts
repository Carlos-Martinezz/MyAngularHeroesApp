import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

	public formGroup: FormGroup;

	constructor( private formBuilder: FormBuilder,
				 private loginService: LoginService,
				 private router: Router ) { 
		/* Validamos que no haya un sesión iniciada */
		if( this.loginService.validarSesion() ) {
			this.router.navigate(['home']);
			this.loginService.show = true;
		} 
		
	}

	ngOnInit(): void {
		this.buildForm();
	}

	private buildForm() {

		this.formGroup = this.formBuilder.group({
			usuario: [ "", Validators.required ],
			contrasena: [ "", Validators.required ]
		});

	}

	public enviar() {

		const usuario: string = this.formGroup.value.usuario;
		const contrasena: string = this.formGroup.value.contrasena;

		if( usuario === '' || contrasena === '' ) {
			return;
		}

		this.loginService.signin( usuario, contrasena ).subscribe( );
		
	}


}
