import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControlName } from '@angular/forms';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';
import { FormControl,FormGroup, FormArray } from '@angular/forms';
import { Autor } from 'src/app/models/autor';
import { ActivatedRoute, Router } from '@angular/router';
//import { group } from 'console';
import { ThisReceiver } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/models/imagen';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-libroform',
  templateUrl: './libroform.component.html',
  styleUrls: ['./libroform.component.css']
})
export class LibroformComponent implements OnInit {

  Miformulario: FormGroup;
  flag=false;///condicional de mostrar o no mostrar
  libros:any[]=[];///para el for
  libro:Libro=new Libro();
 

    @ViewChild('imagenInputFile',{static:false}) imagenFile:ElementRef;

    imagen:File;
    imagenMin:File;
  constructor(private libroservice:LibroService, 
    private fb:FormBuilder, private router:Router, 
    private activatedRoute:ActivatedRoute,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {

   let aux= JSON.parse(sessionStorage.getItem("cuenta"));
   console.log(this.libro);
    this.Miformulario= this.fb.group({
      isbn:[''],
      titulo:[''],
      stock:[],
      precioUnitario:[],
      descripcion:[''],
      autores:this.fb.array([this.fb.group({nombre:['']})]),
      generos:this.fb.array([this.fb.group({nombre:['']})]),
      editoriales:this.fb.array([this.fb.group({nombre:['']})]),
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
    //libro.imagen=formValue.this.libroservice.uploadImg(this.imagen)
    //libro.imagen=formValue.Imagen;
      console.log(libro);
      //this.onUpload(libro.isbn,this.imagen);
      
    //this.libroservice.addlibro(libro);*/
    //this.libroservice.addautor(autor);//ojo

    console.log(this.imagen);
    this.libroservice.uploadImg(this.imagen,libro.isbn).subscribe(
      data=>{
        this.spinner.hide();
        this.libroservice.createLi(libro).subscribe
          (resp=>this.router.navigate(['/lista']));
        //this.router.navigate(['/lista']);
      },
      err=>{
        this.spinner.hide();
        Swal.fire('Alerta',`Imagen No subida`, 'warning' );
        this.reset();
      }
    );
  }
  cargar():void{
    this.activatedRoute.params.subscribe(
      b=>{
        let id = b['id'];
        if(id){
          this.libroservice.get(id).subscribe(
            (ac=>{
              this.libro = ac;
              console.log(ac);
              this.Miformulario.patchValue({
                  isbn:(ac.isbn),
                  titulo:(ac.titulo),
                  stock:(ac.stock),
                  precioUnitario:(ac.precioUnitario),
                  descripcion:(ac.descripcion), 
                  autores:[''],
                  generos:[''],
                  editoriales:[ac.editoriales[0].nombre]

   });
 
   console.log(ac.autores[0].nombre)}
   
   ));
        }})
      }
// cargar():void{
//   //const libro= new Libro();
//   this.activatedRoute.params.subscribe(
//     b=>{
//       let id = b['id'];
//       if(id){
//         this.libroservice.get(id).subscribe(
//           (ac=>{this.libro=ac;console.log(ac)}));
//       }})
//     }

      ///edit
      update():void{
        this.libroservice.update(this.libro).subscribe(
          u=>this.router.navigate(['/lista']));
      }

 //AUTOR
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

  ////IMAGEN
  onFileChange(event:any){//ojo any
    this.imagen=event.target.files[0];
    const fr=new FileReader();
    fr.onload=(evento:any)=>{
        this.imagenMin=evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
    console.log('onfile')
  }

  onUpload(isbn:string,img:File):void{
    
  }
  reset():void{
    this.imagen=null;
    this.imagenMin=null;
    this.imagenFile.nativeElement.value='';
  }

}
