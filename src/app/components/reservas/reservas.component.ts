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

    if(libro.stock===0 || libro.stock<0){
      Swal.fire('ERROR',`LIBRO CON STOCK EN CERO`,'warning')
      }else{

    if(this. existeLibro(libro.isbn)){
      this.incrementaCantidad(libro.isbn);
    }  else{
      let nuevoDetalle= new DetalleReserva();
      nuevoDetalle.libro=libro;
      this.reserva.detalleReservas.push(nuevoDetalle);
       }

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

      if(item.cantidad>=item.libro.stock){
         Swal.fire('ERROR',`LA CANTIDAD EXCEDE EL STOCK DISPONIBLE`,'warning')
         item.cantidad=item.libro.stock;
      }
      else{
      if(isbn === item.libro.isbn){
        ++item.cantidad;
      }
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

      if(item.cantidad>=item.libro.stock){
        Swal.fire('ERROR',`LA CANTIDAD EXCEDE EL STOCK DISPONIBLE`,'warning')
       --item.cantidad
      }else{
      if(isbn === item.libro.isbn){
        item.cantidad=cantidad;
      }

    }

      return item;
    });
  }

  eleminarItemLibro(isbn:string):void{
    this.reserva.detalleReservas = this.reserva.detalleReservas.filter((item:DetalleReserva)=> isbn !== item.libro.isbn);
  }

  create(notasForm:any):void{

    if(this.reserva.detalleReservas.length == 0){
      this.myControl.setErrors({'invalid':true});
    }

    if(this.reserva.abono==this.reserva.calcularGranTotal()){
      Swal.fire('ERROR',`EL ABONO ES IGUAL AL TOTAL, PORFAVOR CREE UNA NOTA DE VENTA`,'warning');
    }else{
    

    if(this.reserva.abono>this.reserva.calcularGranTotal()){
      Swal.fire('ERROR',`El ABONO NO PUEDE EXCEDER EL TOTAL`,'warning');
    }
    else{
///CREAR RESERVA CON EXITO////
    if(notasForm.form.valid && this.reserva.detalleReservas.length > 0 ){
    this.reserva.cuenta.idCuenta= JSON.parse(sessionStorage.getItem("cuenta")).idCuenta;
    console.log(this.reserva);
     this.reservaService.create(this.reserva).subscribe(res=>{ 
       Swal.fire(this.titulo,`CREADO CON ÉXITO`,'success');
       this.router.navigate(['/reservas']);
     });
       //res=>this.router.navigate(['/notas_de_venta']))
   }}
//////
  }

  }
/////control cedula
public validador;
validadorCedula(cedula:string){
let cedulaCorrecta=false;
if(cedula.length==10){
  let tercerDig =parseInt(cedula.substring(2,3));
  if(tercerDig<6){
     let coefValCedula =[2, 1, 2, 1, 2, 1, 2, 1, 2];
     let verificador=  parseInt(cedula.substring(9, 10));
     let suma:number=0;
     let digito:number=0;
     for(let i=0;i<(cedula.length-1);i++){
      digito=parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
      suma+=((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
     }
     suma= Math.round(suma);
     if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
      cedulaCorrecta = true;
     } else if ((10 - (Math.round(suma % 10))) == verificador) {
      cedulaCorrecta = true;
  } else{
    cedulaCorrecta=false;
  }
  }else{
    cedulaCorrecta = false;
   }
} else {
  cedulaCorrecta = false;
}
//
if (cedula=="0000000000"  || cedula=="2222222222" ||  cedula=="4444444444" ||cedula=="5555555555" ||cedula=="1010101010"||cedula=="2020202020"||cedula=="3030303030"||cedula=="4040404040"){
  cedulaCorrecta = false;
 }
this.validador= cedulaCorrecta;

}  

  
  
}
