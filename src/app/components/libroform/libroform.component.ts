import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';
import { FormControl,FormGroup, FormArray } from '@angular/forms';
import { Autor } from 'src/app/models/autor';
import { ActivatedRoute, Router } from '@angular/router';
//import { group } from 'console';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-libroform',
  templateUrl: './libroform.component.html',
  styleUrls: ['./libroform.component.css']
})
export class LibroformComponent implements OnInit {

  Miformulario!: FormGroup;
  flag=false;///condicional de mostrar o no mostrar
  libros:any[]=[];///para el for
  libro:Libro=new Libro();


  
  constructor(private libroservice:LibroService, private fb:FormBuilder, private router:Router, private activatedRoute:ActivatedRoute) { 
   
  }

  ngOnInit() {
   // this.cargar()
   let aux= JSON.parse(sessionStorage.getItem("cuenta"));
    this.Miformulario= this.fb.group({
      isbn:[''],
      titulo:[''],
      stock:[],
      precioUnitario:[],
      descripcion:[''],
      autores:this.fb.array([this.fb.group({nombre:['']})]),
      generos:this.fb.array([this.fb.group({nombre:['']})]),
      editoriales:this.fb.array([this.fb.group({nombre:['']})]),
      /*nombreAutor:[''],
      autor:this.fb.array([this.fb.group({autor:['']})]),*/
      cuenta:aux.idCuenta,
      

      
    });

    console.log(aux);
    
    this.cargar();
    
  }

  createL():void{
    console.log(this.libro);
   /* this.libroservice.createLi(this.libro).subscribe
    (resp=>this.router.navigate(['/lista']));*/
  }

  onSubmit(formValue: any){ 
 
    const libro= new Libro();
    libro.isbn=formValue.isbn;
    libro.titulo=formValue.titulo;
    libro.stock=formValue.stock;
    libro.precioUnitario=formValue.precioUnitario;
    libro.descripcion=formValue.descripcion;   
    libro.autores=formValue.autores;
    libro.generos=formValue.generos;
    libro.editoriales=formValue.editoriales;
    libro.cuenta.idCuenta=formValue.cuenta;
    /*
    libro.imagen=formValue.imagen;*/
      console.log(libro);
      this.libroservice.createLi(libro).subscribe
          (resp=>this.router.navigate(['/lista']));
    //this.libroservice.addlibro(libro);*/
    //this.libroservice.addautor(autor);//ojo
  }
cargar():void{
  //const libro= new Libro();
  this.activatedRoute.params.subscribe(
    b=>{
      let id=b['id'];
      if(id){
        this.libroservice.get(id).subscribe(
          (ac=>{this.libro=ac;console.log(this.libro)}));
      }})}

      ///edit
      update():void{
        this.libroservice.update(this.libro).subscribe(
          u=>this.router.navigate(['/lista']));
      }

 //AUTOTOR
  get getnombreautor(){
    return this.Miformulario.get('autores') as FormArray;
  }
  addnombreAutor(){
    const control=<FormArray>this.Miformulario.controls['autores'];
    control.push(this.fb.group({nombre:[]}));
  }
  removeAutor(index:number){
    const control=<FormArray>this.Miformulario.controls['autores'];
    control.removeAt(index);
  }
  //FIN AUTOR

  //GENERO
  get getGeneros(){
    return this.Miformulario.get('generos') as FormArray;
  }
  addGenero(){
    const control=<FormArray>this.Miformulario.controls['generos'];
    control.push(this.fb.group({nombre:[]}));
  }
  removeGenero(index:number){
    const control=<FormArray>this.Miformulario.controls['generos'];
    control.removeAt(index);
  }
  //FIN GENERO
  
  //EDITORIAL
  get getEditorial(){
    return this.Miformulario.get('editoriales') as FormArray;
  }
  addEditorial(){
    const control=<FormArray>this.Miformulario.controls['editoriales'];
    control.push(this.fb.group({nombre:[]}));
  }
  removeEditorial(index:number){
    const control=<FormArray>this.Miformulario.controls['editoriales'];
    control.removeAt(index);
  }
  //FIN EDITORIAL

}
