import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';
import { Reserva } from '../models/reserva';
import { UserLoginService } from './user-login.service';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private url:string="http://localhost:8088/geolib/reservas";
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

 getAll():Observable<Reserva[]>{
  return this.http.get<Reserva[]>(this.url,{headers:this.agregarAuthorizationHeader()});
 }

 create(reserv:Reserva):Observable<Reserva>{
  return this.http.post<Reserva>(this.url,reserv,{headers:this.agregarAuthorizationHeader()});
 }

 delete(idReserva:number):Observable<Reserva>{
  return this.http.delete<Reserva>(this.url+'/'+idReserva,{headers:this.agregarAuthorizationHeader()})};

  get(idReserva:number):Observable<Reserva>{
    return this.http.get<Reserva>(this.url+'/id/'+idReserva,{headers:this.agregarAuthorizationHeader()});
  }

  filtrarProductos(term:string):Observable<Libro[]>{
    return this.http.get<Libro[]>(this.urlLib+'/'+term,{headers:this.agregarAuthorizationHeader()})
  }


}
