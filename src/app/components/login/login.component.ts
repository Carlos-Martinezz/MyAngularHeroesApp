import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public formGroup: FormGroup;

	constructor( private formBuilder: FormBuilder,
				 private loginService: LoginService,
				 private router: Router ) { 
		if( this.loginService.validarSesion() ) {
			this.router.navigate(['home']);
			this.loginService.show = true;
		} 
		
	}

	ngOnInit(): void {
		this.buildForm();
	}

	private buildForm() {

		const usuario = "Carlos";

		this.formGroup = this.formBuilder.group({
			usuario: [ usuario, Validators.required ],
			contrasena: [ "12345", Validators.required ]
		});

	}

	public enviar() {

		const usuario: string = this.formGroup.value.usuario;
		const contrasena: string = this.formGroup.value.contrasena;

		if( usuario === '' || contrasena === '' ) {
			return;
		}

		this.loginService.login( usuario, contrasena ).subscribe();
		
	}

}
