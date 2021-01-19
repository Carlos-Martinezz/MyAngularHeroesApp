import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
	
	private urlBase: string = "http://192.168.1.5:8080/heroes-api/";

	transform( rutaImagen: string ): string {
		return rutaImagen === "" ? "assets/images/no-image.png" : `${ this.urlBase }getImage/${ rutaImagen }`;
	}

}
