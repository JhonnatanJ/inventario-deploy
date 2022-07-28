import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url:string="http://localhost:8088/geolib/autores";
  constructor(private http:HttpClient) { }
//obtener todos los USERS
getAllau():Observable<Autor[]>{
    return this.http.get<Autor[]>(this.url)};
    //USER POR ID
 /* getidUs(id:number):Observable<Usuario>{
      return this.http.get<Usuario>(this.url+'/'+id)};
  //INTRODUCIR USERS 
  createRol(user:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url,user)};*/
}
