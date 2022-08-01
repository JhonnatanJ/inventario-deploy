import { Pipe, PipeTransform } from '@angular/core';
import { Libro } from '../models/libro';

@Pipe({
  name: 'libroISBN'
})
export class LibroISBNPipe implements PipeTransform {

  transform(libros: Libro[], isbn:string=""): Libro[] {

    if(!isbn){
      return libros;
    }
    
    const result=[];
    for(const lib of libros){
      if(lib.isbn.toLowerCase().indexOf(isbn.toLowerCase())>-1){
        result.push(lib);
      }
    }

    return result;
  }

}
