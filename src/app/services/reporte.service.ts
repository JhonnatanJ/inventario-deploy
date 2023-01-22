import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginService } from './user-login.service';
import { Observable } from 'rxjs';
import { Cuenta } from '../models/cuenta';
import { NotaVenta } from '../models/nota-venta';
import { Reserva } from '../models/reserva';
import { Libro } from '../models/libro';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  //private urlCuenta: string = "http://localhost:8088/geolib/cuentas";
  //private urlNotaVenta: string = "http://localhost:8088/geolib/notasventas";
  //private urlReserva: string = "http://localhost:8088/geolib/reservas";
  //private urlLibro:string="http://localhost:8088/geolib/libros";

  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient, private userloginService:UserLoginService) { }

  private agregarAuthorizationHeader(){
    let token=this.userloginService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }

  getCuenta(idCuenta:number):Observable<Cuenta>{
    return this.http.get<Cuenta>(environment.urlCuenta+`/id/${idCuenta}`,{headers:this.agregarAuthorizationHeader()});
  }
/////////////////////////
  getNotaVenta2(fechaI:string, fechaF:string):Observable<NotaVenta[]>{
    return this.http.get<NotaVenta[]>(environment.urlNotaVenta+`/fecha/${fechaI}/${fechaF}`,{headers:this.agregarAuthorizationHeader()});
  }
///////////
  getReserva2(fechaI:string, fechaF:string):Observable<Reserva[]>{
    return this.http.get<Reserva[]>(environment.urlReserva+`/abonos/${fechaI}/${fechaF}`,{headers:this.agregarAuthorizationHeader()});
  }

  getNotaVenta(fechaI:string):Observable<NotaVenta[]>{
    return this.http.get<NotaVenta[]>(environment.urlNotaVenta+`/fecha/${fechaI}`,{headers:this.agregarAuthorizationHeader()});
  }

  getReserva(fechaI:string):Observable<Reserva[]>{
    return this.http.get<Reserva[]>(environment.urlReserva+`/abonos/${fechaI}`,{headers:this.agregarAuthorizationHeader()});
  }

  getLibroStock():Observable<Libro[]>{
    return this.http.get<Libro[]>(environment.urlLibros+'/stock',{headers:this.agregarAuthorizationHeader()});
  }

  getLibroStockVacio():Observable<Libro[]>{
      return this.http.get<Libro[]>(environment.urlLibros+'/stockempty',{headers:this.agregarAuthorizationHeader()});
  }

  getLibroFechaRegistro(fechaI:string, fechaF:string):Observable<Libro[]>{
    return this.http.get<Libro[]>(environment.urlLibros+'/fecha/'+fechaI+'/'+fechaF,{headers:this.agregarAuthorizationHeader()});
  }
}
