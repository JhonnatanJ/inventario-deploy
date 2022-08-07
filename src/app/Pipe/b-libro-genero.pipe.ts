import { Pipe, PipeTransform } from '@angular/core';
import { Libro } from '../models/libro';

@Pipe({
  name: 'bLibroGenero'
})
export class BLibroGeneroPipe implements PipeTransform {

  transform(libro: Libro[], genero:string=""): Libro[]{
   if(!genero) {return libro;}

   const result=[];
   for(const g of libro){
     for(const ge of g.generos){
         if(ge.nombre.toLowerCase().indexOf(genero.toLowerCase())>-1 ){
             result.push(g);
         }
     }
     
   }

   return result;
  }

}
