import { Pipe, PipeTransform } from '@angular/core';
import { Autor } from '../models/autor';
import { Libro } from '../models/libro';

@Pipe({
  name: 'bLibroAutor'
})
export class BLibroAutorPipe implements PipeTransform {

  transform(libr: Libro[], nombreA:string=""): Libro[] {
    if(!nombreA){
      return libr
    }


    const result=[];
    for(const a of libr){
      for(const au of a.autores){
          if(au.nombre.toLowerCase().indexOf(nombreA.toLowerCase())>-1 ){
              result.push(au);
          }
      }
      
    }

    return JSON.parse(JSON.stringify(result));
  }

}
