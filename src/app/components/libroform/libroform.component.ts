import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
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
  
  autorLibro:string="";
  generoLibro:string="";
  editorialLibro:string="";

  load: boolean;
   nuevoS:number=0;

    //ISBN Validator
 isbnValue: string = ""
 

    @ViewChild('imagenInputFile',{static:false}) imagenFile:ElementRef;

    imagen:File;
    imagenMin:File;
  constructor(public libroservice:LibroService, 
    private fb:FormBuilder, private router:Router, 
    private activatedRoute:ActivatedRoute,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {

   let aux= JSON.parse(sessionStorage.getItem("cuenta"));
   console.log(this.libro);
    this.Miformulario= this.fb.group({
      isbn:['',Validators.required],
      titulo:['',Validators.required],
      stock:['',Validators.required],
      precioUnitario:['',Validators.required],
      descripcion:['',Validators.required],
      autores:this.fb.array([this.fb.group({nombre:['']})]),
      generos:this.fb.array([this.fb.group({nombre:['']})]),
      editoriales:this.fb.array([this.fb.group({nombre:['']})]),
      cuenta:aux.idCuenta, 
    },
    { validator: this.isbnValidate}
////
    );
    
    

   this.cargar();    
  }//ngOnInit
 

  createL():void{
    console.log(this.libro);
   /* this.libroservice.createLi(this.libro).subscribe
    (resp=>this.router.navigate(['/lista']));*/
  }

  onSubmit(formValue: any){ 

    if(this.Miformulario.valid){
 
    const libro= new Libro(); 
    libro.isbn=formValue.isbn;   
    libro.titulo=formValue.titulo;
    this.libro.titulo=formValue.titulo;
    libro.stock=formValue.stock+this.nuevoS;
    this.libro.stock=this.libro.stock+this.nuevoS;
    libro.precioUnitario=formValue.precioUnitario;
    this.libro.precioUnitario=formValue.precioUnitario;
    libro.descripcion=formValue.descripcion;   
    this.libro.descripcion=formValue.descripcion;

    libro.autores=formValue.autores;
         
    libro.generos=formValue.generos;
    
    libro.editoriales=formValue.editoriales;

    libro.cuenta.idCuenta=formValue.cuenta;


    if(this.imagen && this.libro.imagen.id){
      this.libroservice.updateImg(this.imagen,this.libro.isbn).subscribe(
        data=>{
          this.spinner.hide();
          console.log(libro);
          this.libroservice.update(this.libro).subscribe
            (resp=>this.router.navigate(['/lista']));
        }
      );
    }else{
      if(this.libro.imagen.id){

        formValue.autores.forEach(z=>{
          if(z.nombre!=''||z.nombre!=""){
            this.libro.autores=formValue.autores
          }
        })

        formValue.generos.forEach(g => {
          if(g.nombre!=''||g.nombre!=""){
            this.libro.generos=formValue.generos
          }
        });

        formValue.editoriales.forEach(e => {
          if(e.nombre!=''||e.nombre!=""){
            this.libro.editoriales=formValue.editoriales
          }
        });
       
        console.log(this.libro)
        this.libroservice.update(this.libro).subscribe
            (resp=>this.router.navigate(['/lista']));
      }else{
        this.libroservice.uploadImg(this.imagen,libro.isbn).subscribe(
          data=>{
            this.spinner.hide();
            this.libroservice.createLi(libro).subscribe
              (resp=>this.router.navigate(['/lista']));
          },
          err=>{
            this.spinner.hide();
            Swal.fire('Alerta',`Imagen No subida`, 'warning' );
            this.reset();
          }
        );
      }
      
    }
  }


  }///FIN

  get isbn(){ return this.Miformulario.get('isbn');} 
  get titulo(){ return this.Miformulario.get('titulo');} 
  get stock(){ return this.Miformulario.get('stock')} 
  get precioUnitario(){ return this.Miformulario.get('precioUnitario')} 
  // get autor(){ return this.Miformulario.get('autor')} 
  // get genero(){ return this.Miformulario.get('genero')} 
  // get editorial(){ return this.Miformulario.get('editorial')} 
  cargar():void{
    this.activatedRoute.params.subscribe(
      b=>{
        let id = b['id'];
        if(id){
          this.libroservice.get(id).subscribe(
            (
              ac=>{
              this.libro = ac;
              this.autorLibro=ac.autores[0].nombre;
              this.generoLibro=ac.generos[0].nombre;
              this.editorialLibro=ac.editoriales[0].nombre;             
              console.log(ac);

              

              this.Miformulario.patchValue({
                  isbn:(ac.isbn),
                  titulo:(ac.titulo),
                  stock:(ac.stock),
                  precioUnitario:(ac.precioUnitario.toFixed(2)),
                  descripcion:(ac.descripcion),         

              });
           
                this.Miformulario.controls['stock'].disable();
                this.Miformulario.controls['isbn'].disable();
                
   this.load=true}
   
   )); 
        }})
      }///CARGAR

creado():void{
  Swal.fire('LIBRO',`CREADO CON EXITO`,'success');
}

      ///edit
      update():void{
        this.libroservice.update(this.libro).subscribe(
          u=>this.router.navigate(['/lista']));
          Swal.fire('LIBRO',`EDITADO CON EXITO`,'success');
      }

 //AUTOR///BORRAR
  get getnombreautor(){
    return (this.Miformulario.get('autores') as FormArray);
  }

  //FIN AUTOR

  //GENERO
  get getGeneros(){
    return this.Miformulario.get('generos') as FormArray;
  }

  //FIN GENERO
  
  //EDITORIAL
  get getEditorial(){
    return this.Miformulario.get('editoriales') as FormArray;
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

 
  reset():void{
    this.imagen=null;
    this.imagenMin=null;
    this.imagenFile.nativeElement.value='';
  }

  ///validar ISBN
  public isbnValidate(g:FormGroup){
    var isbnValue= g.get('isbn').value
    var subject = isbnValue;
  
       // Checks for ISBN-10 or ISBN-13 format
     var regex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
  
     if (regex.test(subject)) {
      // Remove non ISBN digits, then split into an array
      var chars = subject.replace(/[- ]|^ISBN(?:-1[03])?:?/g, "").split("");
      // Remove the final ISBN digit from `chars`, and assign it to `last`
      var last = chars.pop();
      var sum = 0;
      var check, i;
  
      if (chars.length == 9) {
          // Compute the ISBN-10 check digit
          chars.reverse();
          for (i = 0; i < chars.length; i++) {
              sum += (i + 2) * parseInt(chars[i], 10);   
              console.log("ojo")          
          }
          check = 11 - (sum % 11);
          if (check == 10) {
              check = "X";
          } else if (check == 11) {
              check = "0";
          }
      } else {
        if(chars.length==13){
          // Compute the ISBN-13 check digit         
          for (i = 0; i < chars.length; i++) {
              sum += (i % 2 * 2 + 1) * parseInt(chars[i], 10);
          }
          check = 10 - (sum % 10);
          if (check == 10) {
              check = "0";
          }
        }
      }
  
      if (check != last) {
        return null;
          
      } 
      else {
        return  g.get('isbn').setErrors( {CheckDigit: true} )
          
      }
    } 
    else {
      return g.get('isbn').setErrors( {Invalid: true} );
  }
  
  }

}
