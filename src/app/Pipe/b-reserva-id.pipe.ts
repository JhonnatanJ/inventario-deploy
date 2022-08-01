import { Pipe, PipeTransform } from '@angular/core';
import { Reserva } from '../models/reserva';

@Pipe({
  name: 'bReservaID'
})
export class BReservaIDPipe implements PipeTransform {

  transform(id: Reserva[], idR: number): Reserva[] {
    if(!idR){
      return id;
    }

    const result=[];
    for(const r of id){
      if(r.idReserva==idR){
        result.push(r);
      }
    }
    return result;
  }

}
