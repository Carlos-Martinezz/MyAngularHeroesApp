import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	constructor( public loginService: LoginService ) {

	}

	ngOnInit(): void {

	}

	logout() {
		this.loginService.logout();
	}

}
