import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/models/autor';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';
import { flatMap, map, Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { Reserva } from 'src/app/models/reserva';
import { ActivatedRoute } from '@angular/router';
import { DetalleReserva } from 'src/app/models/detalle-reserva';
import { ReservasService } from 'src/app/services/reservas.service';

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

  reservas:Reserva[];
  reserva:Reserva=new Reserva();
  detalle:DetalleReserva[];
  detalles:DetalleReserva=new DetalleReserva();


   //busqueda
   search:string= "";///titulos
   isbn:string= "";//isbn
   nombreA:string="";//autor
   genero:string="";//genero
   editorial:string="";//editorial
 
  constructor(public libroService:LibroService,
    private activatedRoute:ActivatedRoute,
    private reservaService:ReservasService) { }

  ngOnInit(): void {
   
    this.libroService.getAllL().subscribe((l=>{this.libros=l;console.log(l)}));

    this.libroService.habilitar=false;
  }

  
 
  delete(libro:Libro):void{

    console.log(this.reserva)


    // this.activatedRoute.params.subscribe(
    //   r=>{
    //   let id =r['id'];
      
    //   if(id){
    //     this.reservaService.get(id).subscribe(
    //       re=>{this.reserva=re;console.log(re)});
    //   }
    
    // })

  //   console.log(libro.isbn)
    this.reservaService.getAll().subscribe((

      r=>{this.reservas=r}  
     
 ));

// this.reserva.detalleReservas.forEach(detalleReserva=>
//   {
//     if(detalleReserva.libro.isbn=libro.isbn){
//       console.log(detalleReserva.libro.isbn)
//     console.log("probandooooo")
//     }
    
//   })



    // if(this.detalles.libro.titulo=libro.isbn){
    //         console.log("PROBANDO RESRVA ELIMINAR");
    //         console.log(this.detalles.libro);
    //         console.log(libro.isbn);
    //       }

   
    // for(let a of this.reservas){
      
    //     for(let au of a.detalleReservas){
    //       if(libro.isbn=au.libro.isbn){
    //         console.log("PROBANDO RESRVA ELIMINAR");
    //         console.log(libro.isbn)
    //       }
    //     }
      
    // }

    // Object.values(this.reservas || {})

    // this.activatedRoute.params.subscribe(
    //   r=>{
    //     let id=r['id'];
    //     if(id){
    //       this.reservaService.getAll().subscribe(
    //         re=>{console.log("re")});
    //     }})
   


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
