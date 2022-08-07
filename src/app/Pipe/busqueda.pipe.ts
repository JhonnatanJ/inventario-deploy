import { Pipe, PipeTransform } from '@angular/core';
import { Cuenta } from '../models/cuenta';
import { Libro } from '../models/libro';

@Pipe({
  name: 'busqueda'
})

export class BusquedaPipe implements PipeTransform {

  transform(libros: Libro[], search:string=""): Libro[] {
    
    if(!search){
      return libros
    }

    const result=[];
    for(const lib of libros){
      if(lib.titulo.toLowerCase().indexOf(search.toLowerCase())>-1){
        result.push(lib);
      }
    }

    return result;
  }
}
