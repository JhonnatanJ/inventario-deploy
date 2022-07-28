import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class ROLService {
 // private url:string="http://localhost:8088/geolib/roles";

  constructor() { }
////cobtener todos rol
/*getAllid():Observable<Rol[]>{
  return this.http.get<Rol[]>(this.url)};
///obtner 1 rol
getid(id:number):Observable<Rol>{
  return this.http.get<Rol>(this.url+'/'+id)};

  ///crear rol
  /*createRol(rol:Rol):Observable<Rol>{
    return this.http.post<Rol>(this.url,rol)};
  ///modificar rol
  /*update(rol:Rol):Observable<Rol>{
    return this.http.put<Rol>(this.url,rol);
  }*/

}
