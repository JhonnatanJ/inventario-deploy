import { Pipe, PipeTransform } from '@angular/core';
import { NotaVenta } from '../models/nota-venta';

@Pipe({
  name: 'bVentaVendedor'
})
export class BVentaVendedorPipe implements PipeTransform {

  transform(notaV: NotaVenta[], vendedor:string=""): NotaVenta[] {
    if(!vendedor){return notaV;}

    const result=[];
    for(const n of notaV){
      if(n.cuenta.usuario.nombres.toLowerCase().indexOf(vendedor.toLowerCase())>-1){
        result.push(n);
      }     
    }
    return result;
  }

}
