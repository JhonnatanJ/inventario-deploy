import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Autor } from '../models/autor';
import { Imagen } from '../models/imagen';
import { Libro } from '../models/libro';
import { UserLoginService } from './user-login.service';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  public habilitar:boolean=false;///

  libro!:Libro;
  //private url:string="http://localhost:8088/geolib/libros";
  //private urlLib:string="http://localhost:8088/geolib/libros/nombre";
  //private ImgUrl:string="http://localhost:8088/geolib/imagenes"
  
  
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient,private userloginService:UserLoginService) { }

  private agregarAuthorizationHeader(){
    let token=this.userloginService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }
//IMAGEN
   list():Observable<Imagen[]>{
    return this.http.get<Imagen[]>(environment.urlImagen)
  }

  
   uploadImg(imagen:File,isbn:string):Observable<any>{
    const formData=new FormData();
    formData.append('multipartFile',imagen);
    console.log(formData);
    console.log(imagen);
    return this.http.post<any>(environment.urlImagen+`/${isbn}`,formData);
  }

  updateImg(imagen:File,isbn:string):Observable<any>{
     const formData=new FormData();
     formData.append('multipartFile',imagen);
    return this.http.put<any>(environment.urlImagen+`/${isbn}`,formData);
  }

  deleteImg(isbn:string):Observable<any>{
    return this.http.delete<any>(environment.urlImagen+`/${isbn}`,{headers:this.agregarAuthorizationHeader()});
  }
////LIBRO
  getAllL():Observable<Libro[]>{
    return this.http.get<Libro[]>(environment.urlLibros,{headers:this.agregarAuthorizationHeader()})};
/////crear libro
  createLi(libros:Libro):Observable<Libro>{
    return this.http.post<Libro>(environment.urlLibros,libros,{headers:this.agregarAuthorizationHeader()})
  }
  ///obtener 1 libro
  get(isbn:string):Observable<Libro>{
    return this.http.get<Libro>(environment.urlLibros+'/id/'+isbn,{headers:this.agregarAuthorizationHeader()});
  }
  ///actualizar
  update(libros:Libro):Observable<Libro>{
    return this.http.put<Libro>(environment.urlLibros+'/'+libros.isbn,libros,{headers:this.agregarAuthorizationHeader()});
  }
  ///eliminar
  delete(isbn:string):Observable<Libro>{
    return this.http.delete<Libro>(environment.urlLibros+'/'+isbn,{headers:this.agregarAuthorizationHeader()});
  }
  ///get autor
  getA():Observable<Libro[]>{
    return this.http.get<Libro[]>('https://api-geomundo.herokuapp.com/geolib/autores')};
   
    filtrarProductos(term:string):Observable<Libro[]>{
      return this.http.get<Libro[]>(environment.urlLibrosNombre+'/'+term,{headers:this.agregarAuthorizationHeader()})
    }

 /* getlibrotitulo(){
    this.http.get('http://localhost:8088/geolib/libros')//OJO DIRECCION
    .subscribe(resp =>{
      console.log(resp);
    });
  }
  getautor(){
    this.http.get('http://localhost:8088/geolib/autores')///OJO DIRECCION
    .subscribe(resp =>{
      console.log(resp);
    });
  }
  addautor(autor:Autor){
    const data=new Autor();
    data.idAutor=autor.idAutor;
    data.nombre=autor.nombre;
    this.http.post('http://localhost:8088/geolib/autores/nombre',data)//OJO--DIRECCION
    .subscribe(resp =>{
      console.log(resp);
    });
    
    }
/*
  addlibro(libro:Libro) {
    const data=new Libro();
    data.isbn=libro.isbn;
    data.titulo=libro.titulo;
    data.descripcion=libro.descripcion;
    data.stock=libro.stock;
    data.precioUnitario=libro.precioUnitario;
    data.imagen=libro.imagen;

    this.http.post('http://localhost:8088/geolib/libros/nombre',data)///OJO DIRECCION 
    .subscribe(resp =>{
      console.log(resp);
    });
  }*/

}
