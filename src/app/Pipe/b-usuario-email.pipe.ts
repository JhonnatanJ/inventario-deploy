import { Pipe, PipeTransform } from '@angular/core';
import { Cuenta } from '../models/cuenta';

@Pipe({
  name: 'bUsuarioEmail'
})
export class BUsuarioEmailPipe implements PipeTransform {

  transform(email: Cuenta[], correo: string=""): Cuenta[]{
    if(!correo){
      return email;
    }

    const result=[];
    for(const cue of email){
      if(cue.email.toLowerCase().indexOf(correo.toLowerCase())>-1){
        result.push(cue);
      }
    }

    return result;
  }

}
