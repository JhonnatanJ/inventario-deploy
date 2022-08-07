import { Pipe, PipeTransform } from '@angular/core';
import { Cuenta } from '../models/cuenta';

@Pipe({
  name: 'bUsuarioCed'
})
export class BUsuarioCedPipe implements PipeTransform {

  transform(cedula: Cuenta[], ced: string=""): Cuenta[] {
    if(!ced){
      return cedula;
    }

    const result=[];
    for(const cue of cedula){
      if(cue.usuario.ci.toLowerCase().indexOf(ced.toLowerCase())>-1){
        result.push(cue);
      }
    }

    return result;
    
  }

}
