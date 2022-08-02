import { Pipe, PipeTransform } from '@angular/core';
import { Libro } from '../models/libro';

@Pipe({
  name: 'bLibroEditorial'
})
export class BLibroEditorialPipe implements PipeTransform {

  transform(libro:Libro[], editorial: string=""): Libro[] {
    if(!editorial){return libro;}

    const result=[];
    for(const e of libro){
      for(const ed of e.editoriales){
          if(ed.nombre.toLowerCase().indexOf(editorial.toLowerCase())>-1 ){
              result.push(e);
          }
      }
      
    }
 
    return result;
  }

}
