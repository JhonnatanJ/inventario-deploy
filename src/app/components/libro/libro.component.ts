import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/models/autor';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';
import { flatMap, map, Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  public page!:number;
  autor!:Autor[];
   libros:Libro[]=[];
  libro:Libro=new Libro()
   //busqueda
   search:string= "";///titulos
   isbn:string= "";//isbn
   nombreA:string="";//autor
   genero:string="";//genero
   editorial:string="";//editorial
 
  constructor(public libroService:LibroService) { }

  ngOnInit(): void {
   
    this.libroService.getAllL().subscribe((l=>{this.libros=l;console.log(l)}));

    this.libroService.habilitar=false;
 
  }

  

  
  delete(libro:Libro):void{

    Swal.fire({
      title: '¿Estas Seguro?',
      text: "No podras Revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("hola from delete");
    this.libroService.delete(libro.isbn).subscribe(
      del=>this.libroService.getAllL().subscribe(
        response=>this.libros=response));

        Swal.fire(
          'Eliminado!',
          'Has Eliminado un Libro.',
          'success'
        )
      }
    })



    
  }
  

}
