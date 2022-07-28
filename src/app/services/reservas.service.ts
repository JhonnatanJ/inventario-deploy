import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private url:string="http://localhost:8088/geolib/reservas";

  constructor(private http:HttpClient) { }

 getAll():Observable<Reserva[]>{
  return this.http.get<Reserva[]>(this.url);
 }

 create(reserv:Reserva):Observable<Reserva>{
  return this.http.post<Reserva>(this.url,reserv);
 }

 delete(idReserva:number):Observable<Reserva>{
  return this.http.delete<Reserva>(this.url+'/'+idReserva)};


}
