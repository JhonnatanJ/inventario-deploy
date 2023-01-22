import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';
import { Reserva } from '../models/reserva';
import { UserLoginService } from './user-login.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  //private url:string="http://localhost:8088/geolib/reservas";
  //private urlLib:string="http://localhost:8088/geolib/libros/nombre";

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
  return this.http.get<Reserva[]>(environment.urlReserva,{headers:this.agregarAuthorizationHeader()});
 }

 create(reserv:Reserva):Observable<Reserva>{
  return this.http.post<Reserva>(environment.urlReserva,reserv,{headers:this.agregarAuthorizationHeader()});
 }

 delete(idReserva:number):Observable<Reserva>{
  return this.http.delete<Reserva>(environment.urlReserva+'/'+idReserva,{headers:this.agregarAuthorizationHeader()})};

  get(idReserva:number):Observable<Reserva>{
    return this.http.get<Reserva>(environment.urlReserva+'/id/'+idReserva,{headers:this.agregarAuthorizationHeader()});
  }

  filtrarProductos(term:string):Observable<Libro[]>{
    return this.http.get<Libro[]>(environment.urlLibrosNombre+'/'+term,{headers:this.agregarAuthorizationHeader()})
  }
  ///reserva update abono
  update(idReserva:number,reserv:Reserva):Observable<Reserva>{
    console.log(reserv);
    return this.http.put<Reserva>(environment.urlReserva+'/'+idReserva,reserv,{headers:this.agregarAuthorizationHeader()});
   }


}
