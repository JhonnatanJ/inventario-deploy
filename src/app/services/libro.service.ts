import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor';
import { Libro } from '../models/libro';
import { UserLoginService } from './user-login.service';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  libro!:Libro;
  private url:string="http://localhost:8088/geolib/libros";
  private urlLib:string="http://localhost:8088/geolib/libros/nombre";
  
  
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient,private userloginService:UserLoginService) { }

  private agregarAuthorizationHeader(){
    let token=this.userloginService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }

  getAllL():Observable<Libro[]>{
    return this.http.get<Libro[]>(this.url,{headers:this.agregarAuthorizationHeader()})};
/////crear libro
  createLi(libros:Libro):Observable<Libro>{
    return this.http.post<Libro>(this.url,libros,{headers:this.agregarAuthorizationHeader()})
  }
  ///obtener 1 libro
  get(isbn:number):Observable<Libro>{
    return this.http.get<Libro>(this.url+'/id/'+isbn,{headers:this.agregarAuthorizationHeader()});
  }
  ///actualizar
  update(libros:Libro):Observable<Libro>{
    return this.http.put<Libro>(this.url+'/',libros,{headers:this.agregarAuthorizationHeader()});
  }
  ///eliminar
  delete(isbn:string):Observable<Libro>{
    return this.http.delete<Libro>(this.url+'/'+isbn,{headers:this.agregarAuthorizationHeader()});
  }
  ///get autor
  getA():Observable<Libro[]>{
    return this.http.get<Libro[]>('http://localhost:8088/geolib/autores')};
   
    filtrarProductos(term:string):Observable<Libro[]>{
      return this.http.get<Libro[]>(this.urlLib+'/'+term,{headers:this.agregarAuthorizationHeader()})
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
