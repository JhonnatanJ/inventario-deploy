import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginService } from './user-login.service';
import { Observable } from 'rxjs';
import { Cuenta } from '../models/cuenta';
import { NotaVenta } from '../models/nota-venta';
import { Reserva } from '../models/reserva';
import { Libro } from '../models/libro';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private urlCuenta: string = "http://localhost:8088/geolib/cuentas";
  private urlNotaVenta: string = "http://localhost:8088/geolib/notasventas";
  private urlReserva: string = "http://localhost:8088/geolib/reservas";
  private urlLibro:string="http://localhost:8088/geolib/libros";

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
    return this.http.get<Cuenta>(this.urlCuenta+`/id/${idCuenta}`,{headers:this.agregarAuthorizationHeader()});
  }

  getNotaVenta(fecha:string):Observable<NotaVenta[]>{
    return this.http.get<NotaVenta[]>(this.urlNotaVenta+`/fecha/${fecha}`,{headers:this.agregarAuthorizationHeader()});
  }

  getReserva(fecha:string):Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.urlReserva+`/abonos/${fecha}`,{headers:this.agregarAuthorizationHeader()});
  }

  getLibroStock():Observable<Libro[]>{
    return this.http.get<Libro[]>(this.urlLibro+'/stock',{headers:this.agregarAuthorizationHeader()});
  }

  getLibroStockVacio():Observable<Libro[]>{
      return this.http.get<Libro[]>(this.urlLibro+'/stockempty',{headers:this.agregarAuthorizationHeader()});
  }

  getLibroFechaRegistro(fecha:string):Observable<Libro[]>{
    return this.http.get<Libro[]>(this.urlLibro+'/fecha/'+fecha,{headers:this.agregarAuthorizationHeader()});
  }
}
