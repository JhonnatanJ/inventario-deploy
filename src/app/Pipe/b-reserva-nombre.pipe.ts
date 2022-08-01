import { Pipe, PipeTransform } from '@angular/core';
import { Reserva } from '../models/reserva';

@Pipe({
  name: 'bReservaNombre'
})
export class BReservaNombrePipe implements PipeTransform {

  transform(nombre: Reserva[], search: string=""): Reserva[] {
    if(!search){
      return nombre;
    }

    const result=[];
    for(const r of nombre){
      if(r.usuario.nombres.toLowerCase().indexOf(search.toLowerCase())>-1){
        result.push(r);
      }
    }
    return result;
  }

}
