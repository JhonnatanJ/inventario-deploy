import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { flatMap, map, Observable } from 'rxjs';
import { DetalleReserva } from 'src/app/models/detalle-reserva';
import { Libro } from 'src/app/models/libro';
import { Reserva } from 'src/app/models/reserva';
import { CuentaService } from 'src/app/services/cuenta.service';
import { LibroService } from 'src/app/services/libro.service';
import { ReservasService } from 'src/app/services/reservas.service';
import Swal from 'sweetalert2';
import { ModalReservaService } from '../list-reserva/detalle-reserva/modal-reserva.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit { 
  libros!:Libro[];
  libro:Libro=new Libro();
  total!:number;
  reservas!:Reserva[];
  reserva= new Reserva();

  titulo:string='Reserva';

  ///autocomplete
  myControl = new FormControl('');
  filteredOptions!: Observable<Libro[]>;

  constructor(private modal:NgbModal, 
    private cuentaService:CuentaService, 
    private libroService:LibroService,
    private reservaService:ReservasService,
    private router:Router
    // private activateRoute:ActivatedRoute,
    // private modalRservice:ModalReservaService
    ) { }

  ngOnInit(): void {
    this.libroService.getAllL().subscribe((l=>{this.libros=l}));
    this.reservaService.getAll().subscribe((r=>{this.reservas=r}));



     ///autocomplete
     this.filteredOptions = this.myControl.valueChanges
     .pipe(
       map(value=>typeof value==='string'?value:value.titulo),
 
       flatMap(value => value? this._filter(value):[]),
     );
     
  }//fin NgOnInit

  private _filter(value: string): Observable<Libro[]> {
    const filterValue = value.toLowerCase();

    return this.reservaService.filtrarProductos(filterValue);
  }

  mostrarNombre(libro?:Libro):string{
    return libro? libro.titulo:"" ;
  }

  seleccionLibro(event:MatAutocompleteSelectedEvent):void{
    let libro = event.option.value as Libro;
    console.log(libro);

    if(this. existeLibro(libro.isbn)){
      this.incrementaCantidad(libro.isbn);
    }  else{
      let nuevoDetalle= new DetalleReserva();
      nuevoDetalle.libro=libro;
      this.reserva.detalleReservas.push(nuevoDetalle);
       }

   
    
    this.myControl.setValue('');
    event.option.focus();
    event.option.deselect();
    
  }

  existeLibro(isbn:string):boolean{
    let existe=false;
    this.reserva.detalleReservas.forEach((item:DetalleReserva)=>{
      if( isbn === item.libro.isbn){
        existe=true;
      }
    });
    return existe;
  }

  incrementaCantidad(isbn:string):void{
    this.reserva.detalleReservas=this.reserva.detalleReservas.map((item:DetalleReserva)=>{
      if(isbn === item.libro.isbn){
        ++item.cantidad;
      }
      return item;
    });
  }

  actualizarCantidad(isbn:string,event:any):void{
    let cantidad:number=event.target.value as number;

    if(cantidad==0){
      return this.eleminarItemLibro(isbn);
    }

    this.reserva.detalleReservas=this.reserva.detalleReservas.map((item:DetalleReserva)=>{
      if(isbn === item.libro.isbn){
        item.cantidad=cantidad;
      }
      return item;
    });
  }

  eleminarItemLibro(isbn:string):void{
    this.reserva.detalleReservas = this.reserva.detalleReservas.filter((item:DetalleReserva)=> isbn !== item.libro.isbn);
  }

  create():void{
    this.reserva.cuenta.idCuenta= JSON.parse(sessionStorage.getItem("cuenta")).idCuenta;
    console.log(this.reserva);
     this.reservaService.create(this.reserva).subscribe(res=>{ 
       Swal.fire(this.titulo,`creada con extito`,'success');
       this.router.navigate(['/reservas']);
     });
       //res=>this.router.navigate(['/notas_de_venta']))
   }


  
  
}
