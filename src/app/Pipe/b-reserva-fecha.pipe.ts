import { Pipe, PipeTransform } from '@angular/core';
import { Reserva } from '../models/reserva';

@Pipe({
  name: 'bReservaFecha'
})
export class BReservaFechaPipe implements PipeTransform {

  transform(reserva:Reserva[], fecha: string=""): Reserva[]{
    if(!fecha){return reserva;}

    const result=[];
    for(const r of reserva){
      if(r.fechaCreacion.indexOf(fecha)>-1){
        result.push(r);
      }
    }
    return result;
  }

}
