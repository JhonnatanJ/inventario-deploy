import { Pipe, PipeTransform } from '@angular/core';
import { NotaVenta } from '../models/nota-venta';

@Pipe({
  name: 'bNotasVenta'
})
export class BNotasVentaPipe implements PipeTransform {

  transform(notas: NotaVenta[], search:number): NotaVenta[] {
    if(!search){
      return notas
    }
    const result=[];
    for(const not of notas){
      if(not.idNotaventa==search){
        result.push(not);
      }
    }

    return result;
  }


}
