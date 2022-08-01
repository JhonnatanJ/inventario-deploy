import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
//import { Detalle } from 'src/app/models/detalle';
import { Libro } from 'src/app/models/libro';
import { NotaVenta } from 'src/app/models/nota-venta';
import { LibroService } from 'src/app/services/libro.service';
import { NgModule } from '@angular/core';
import { Detalle } from 'src/app/models/detalle';
import { NotaventaService } from 'src/app/services/notaventa.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { CuentaService } from 'src/app/services/cuenta.service';
import { Cuenta } from 'src/app/models/cuenta';
import { Usuario } from 'src/app/models/usuario';
import { findIndex } from 'rxjs';
import {map, flatMap, switchAll} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { _isTestEnvironment } from '@angular/cdk/platform';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-nota-v',
  templateUrl: './modal-nota-v.component.html',
  styleUrls: ['./modal-nota-v.component.css'],
})
export class ModalNotaVComponent implements OnInit {
  Minotaventa!:FormGroup;
  cuentas!:Cuenta [];

  /////UDEMI FORM
  nota:NotaVenta=new NotaVenta();
  titulo:string='Nueva NotaVenta';
  ///autocomplete
  myControl = new FormControl('');
  filteredOptions!: Observable<Libro[]>;

  //@ViewChild('contenido') modal!: ElementRef;
   constructor(private notaventaService:NotaventaService, private activetedRoute:ActivatedRoute,private modal:NgbModal, private libroService:LibroService,private router:Router,private fb:FormBuilder, private cuentaService:CuentaService){
  
   }
   libro:Libro=new Libro();
  libros:Libro[]=[];
  usuarios:Usuario[]=[];
   librosSeleccionados:any[]=[];
   
   notas:NotaVenta[]=[];
   detalles!:Detalle[];
   
   cuenta:Cuenta=new Cuenta();
   detalle:Detalle=new Detalle();
   total!:number;
   
   
  
  ngOnInit() {
    this.libroService.getAllL().subscribe((l=>{this.libros=l}));
   this.cuentaService.getAll().subscribe(c =>this.cuentas=c);
    this.notaventaService.getAll().subscribe((n=>{this.notas=n}));
    this.cuentaService.getuser().subscribe(respon=>this.usuarios=respon)

    ///UDEMI//
    
    ///autocomplete
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      map(value=>typeof value==='string'?value:value.titulo),

      flatMap(value => value? this._filter(value):[]),
    );
    
    
   
  /*this.Minotaventa=this.fb.group({
    //idNotaventa:[],
    //idCuenta:[''],
    detalles:this.fb.array([this.fb.group({libro:[this.fb.group({isbn:['']})],cantidad:[]  })]),
   // detalle2:this.fb.array([this.fb.group({cantidad:[]})]),

    cuenta:1,
  })*/
  

  }///NgOnInt

  private _filter(value: string): Observable<Libro[]> {
    const filterValue = value.toLowerCase();

    return this.notaventaService.filtrarProductos(filterValue);
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
      let nuevoDetalle= new Detalle();
      nuevoDetalle.libro=libro;
      this.nota.detalles.push(nuevoDetalle);
       }

   
    
    this.myControl.setValue('');
    event.option.focus();
    event.option.deselect();
    
  }

  actualizarCantidad(isbn:string,event:any):void{
    let cantidad:number=event.target.value as number;

    if(cantidad==0){
      return this.eleminarItemLibro(isbn);
    }

    this.nota.detalles=this.nota.detalles.map((item:Detalle)=>{
      if(isbn === item.libro.isbn){
        item.cantidad=cantidad;
      }
      return item;
    });
  }

  existeLibro(isbn:string):boolean{
    let existe=false;
    this.nota.detalles.forEach((item:Detalle)=>{
      if( isbn === item.libro.isbn){
        existe=true;
      }
    });
    return existe;
  }

  incrementaCantidad(isbn:string):void{
    this.nota.detalles=this.nota.detalles.map((item:Detalle)=>{
      if(isbn === item.libro.isbn){
        ++item.cantidad;
      }
      return item;
    });
  }

  eleminarItemLibro(isbn:string):void{
    this.nota.detalles = this.nota.detalles.filter((item:Detalle)=> isbn !== item.libro.isbn);
  }

  create():void{
   this.nota.cuenta.idCuenta= JSON.parse(sessionStorage.getItem("cuenta")).idCuenta;
   console.log(this.nota);
    console.log(this.nota);
    this.notaventaService.create(this.nota).subscribe(res=>{ 
      Swal.fire(this.titulo,`CREADA CON EXITO`,'success');
      this.router.navigate(['/notas_de_venta']);
    });
      //res=>this.router.navigate(['/notas_de_venta']))
  }
 /* onSubmit(formValue:any){
    const notaventa=new NotaVenta();
    //notaventa.idNotaventa=formValue.idNotaventa;
   //notaventa.valorTotal=formValue.valorTotal;
   // notaventa.detalles=formValue.detalle;
    notaventa.detalles=formValue.detalles;
    notaventa.cuenta=formValue.cuenta;
   //this.notaventaService.create(notaventa);
   console.log(notaventa);
    this.notaventaService.create(notaventa).subscribe(
      res=>this.router.navigate(['/notas_de_venta']));
      
  }*/
  
 /* create():void{
    this.notaventaService.create(this.nota).subscribe(
      res=>this.router.navigate(['/notas_de_venta']))
  }*/

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

/*
  ///detalle cantidad
  get getdetallecantidad(){
    return this.Minotaventa.get('detalles')as FormArray;
  }
  addDetallecantidad(){
    const control=<FormArray>this.Minotaventa.controls['detalles'];
    control.push(this.fb.group({cantidad:[]}));
  }
///detalle isbn
get getdetalleisbn(){
  return this.Minotaventa.get('detalles')as FormArray;
}
addDetalleisbn(){
  const control=<FormArray>this.Minotaventa.controls['detalles'];
  control.push(this.fb.group({libro:[this.fb.group({isbn:[]})]}));
}*/




}//fin

