import { Pipe, PipeTransform } from '@angular/core';
import { Reserva } from '../models/reserva';

@Pipe({
  name: 'bReservaVendedor'
})
export class BReservaVendedorPipe implements PipeTransform {

  transform(reserva:Reserva[], vendedor: string=""): Reserva[] {
    if(!vendedor){
      return reserva;
    }

    const result=[];
    for(const r of reserva){
      if(r.cuenta.usuario.nombres.toLowerCase().indexOf(vendedor.toLowerCase())>-1){
        result.push(r);
      }
    }
    return result;
  }

}
