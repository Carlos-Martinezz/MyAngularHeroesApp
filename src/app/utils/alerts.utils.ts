import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from "sweetalert2";

@Injectable({
	providedIn: 'root'
})
export class Alerts {

    alerta( title: string, text: string, icon: SweetAlertIcon, timer?: number ) {
		Swal.fire({
			title: title,
			text: text,
			icon: icon,
			timer: timer ? 2000 : null
		});
    }
    
}