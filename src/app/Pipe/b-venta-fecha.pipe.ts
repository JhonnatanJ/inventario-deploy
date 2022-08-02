import { Pipe, PipeTransform } from '@angular/core';
import { NotaVenta } from '../models/nota-venta';

@Pipe({
  name: 'bVentaFecha'
})
export class BVentaFechaPipe implements PipeTransform {

  transform(nota:NotaVenta[], fecha:string=""): NotaVenta[] {
    if(!fecha){return nota;}

    const result=[];  
    for(const n of nota)
    {
      if(n.fechaRegistro.indexOf(fecha)>-1){
        result.push(n);
      }
    }
    return result;
  }

}
