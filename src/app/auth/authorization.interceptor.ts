import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

	constructor( private loginService: LoginService ) { }

	intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
		request = request.clone({
			setHeaders: {
				Authorization: `${ this.loginService.getToken() }`
			}
		});
		return next.handle( request );
	}
}
