import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';
import { NotaVenta } from '../models/nota-venta';
import { UserLoginService } from './user-login.service';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotaventaService {
  nota!:NotaVenta;
private url:string="http://localhost:8088/geolib/notasventas";
private urlLib:string="http://localhost:8088/geolib/libros/nombre";

private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient, private userloginService:UserLoginService ) { }

  private agregarAuthorizationHeader(){
    let token=this.userloginService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }

getAll():Observable<NotaVenta[]>{
  return this.http.get<NotaVenta[]>(this.url,{headers:this.agregarAuthorizationHeader()});
}

getNota(idNotaventa:number):Observable<NotaVenta>{
  return this.http.get<NotaVenta>(this.url+'/id/'+idNotaventa,{headers:this.agregarAuthorizationHeader()});
}
/*
get(idNotaventa:NotaVenta):Observable<NotaVenta>{
  return this.http.get<NotaVenta>(this.url+'/id/'+idNotaventa)
}*/

create(notas:NotaVenta):Observable<NotaVenta>{
  return this.http.post<NotaVenta>(this.url,notas,{headers:this.agregarAuthorizationHeader()});

}

delete(idNotaventa:number):Observable<NotaVenta>{
  return this.http.delete<NotaVenta>(this.url+'/'+idNotaventa,{headers:this.agregarAuthorizationHeader()})
}

filtrarProductos(term:string):Observable<Libro[]>{
  return this.http.get<Libro[]>(this.urlLib+'/'+term,{headers:this.agregarAuthorizationHeader()})
}

}
