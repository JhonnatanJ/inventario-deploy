import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Libro } from 'src/app/models/libro';
import { CuentaService } from 'src/app/services/cuenta.service';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit { 
  libros!:Libro[];
  librosSeleccionados:any[]=[];
  total!:number;
  constructor(private modal:NgbModal, private cuentaService:CuentaService, private libroService:LibroService) { }

  ngOnInit(): void {
    this.libroService.getAllL().subscribe((l=>{this.libros=l}));
  }

  openSM(contenido:any)
  {
    this.modal.open(contenido,{size:'xl'});
  } 

  agregar(lib:any){
    if(this.librosSeleccionados.some((p)=>p===lib))return;
    this.librosSeleccionados.push(lib);

    this.total=this.librosSeleccionados.reduce((
      acc,
      obj,
    ) => acc + (obj.canti*obj.precioUnitario),
    0 );
    console.log("total:",this.total)
  }

  isSelected(lib:any){
    return this.librosSeleccionados.indexOf(lib) !=-1;
  }

  eliminar(lib:any){
    this.librosSeleccionados.findIndex((p)=>p===lib);
    this.librosSeleccionados.splice(lib,1);

    this.total=this.librosSeleccionados.reduce((
      acc,
      obj,
    ) => (obj.canti*obj.precioUnitario)- acc,
    0 );
    }
  
}
