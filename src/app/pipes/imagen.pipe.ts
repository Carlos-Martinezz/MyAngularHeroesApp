import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
	name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
	
	private urlBase: string = environment.API_URL;

	transform( rutaImagen: string ): string {
		return rutaImagen === "" ? "assets/images/no-image.png" : `${ this.urlBase }/getImage/${ rutaImagen }`;
	}

}
