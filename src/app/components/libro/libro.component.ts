import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/models/autor';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';
import { flatMap, map, Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
   search:string= "";
   isbn:string= "";

   nombreA:string="";
 
  constructor(private libroService:LibroService) { }

  ngOnInit(): void {
   
    this.libroService.getAllL().subscribe((l=>{this.libros=l;console.log(l)}));

 //busqueda
 
  }

  

  
  delete(libro:Libro):void{
    console.log("hola from delete");
    this.libroService.delete(libro.isbn).subscribe(
      del=>this.libroService.getAllL().subscribe(
        response=>this.libros=response));
  }
  

}
