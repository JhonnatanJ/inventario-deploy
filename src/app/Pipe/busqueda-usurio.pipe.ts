import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';
import { Cuenta } from '../models/cuenta';

@Pipe({
  name: 'busquedaUsurio'
})
export class BusquedaUsurioPipe implements PipeTransform {

  transform(cuentas: Cuenta[], search:string=""): Cuenta[] {
    
    if(!search){
      return cuentas;
    }

    const result=[];
    for(const cue of cuentas){
      if(cue.usuario.nombres.toLowerCase().indexOf(search.toLowerCase())>-1){
        result.push(cue);
      }
          
    }

    return result;
    
  }
}
