import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Autor } from '../models/autor';
import { Cuenta } from '../models/cuenta';
import { Rol } from '../models/rol';
import { Usuario } from '../models/usuario';
import { UserLoginService } from './user-login.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
 // cuenta!:Cuenta;
 public habilitar:boolean=false;///
  private url:string="http://localhost:8088/geolib/cuentas";
  private urlRol:string="http://localhost:8088/geolib/roles";
  
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient, public userloginService:UserLoginService, private router:Router) { }



  private agregarAuthorizationHeader(){
    let token=this.userloginService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e:any):boolean{//ojo any
    if(e.status ==401){
      this.router.navigate(['/login']);
      return true;
    }
    if(e.status ==403){
      Swal.fire('Acceso denegado',`Hola ${this.userloginService.cuenta.email} no tienes acceso a este recurso!`,'warning')
      this.router.navigate(['/lista']);
      return true;
    }
    return false;
  }

  //crear administrador
  createRol(roles:Rol[]):Observable<Rol>{//Rol
    return this.http.post<Rol>(this.urlRol,roles,{headers:this.agregarAuthorizationHeader()});
  }

  getRoles():Observable<Rol[]>{
    return this.http.get<Rol[]>(this.urlRol,{headers:this.agregarAuthorizationHeader()});
  }

  ///obtener todas las  cuentas 
getAll():Observable<Cuenta[]>{
  return this.http.get<Cuenta[]>(this.url,{headers:this.agregarAuthorizationHeader()});//,{headers:this.agregarAuthorizationHeader()}
}
//crear cuenta
create(cuentas:Cuenta):Observable<Cuenta>{  
    return this.http.post<Cuenta>(this.url, cuentas,{headers:this.agregarAuthorizationHeader()}); 
  }
  ///obtener 1 cuenta/*
get(idCuenta:number):Observable<Cuenta>{
  return this.http.get<Cuenta>(this.url+'/id/'+idCuenta,{headers:this.agregarAuthorizationHeader()});
}
//actualizar//*/
update(cuentas:Cuenta):Observable<Cuenta>{
  console.log(cuentas);
  return this.http.put<Cuenta>(this.url+'/'+cuentas.idCuenta,cuentas,{headers:this.agregarAuthorizationHeader()});
  }
///eliminar
delete(idCuenta:number):Observable<Cuenta>{
  return this.http.delete<Cuenta>(this.url+'/'+idCuenta,{headers:this.agregarAuthorizationHeader()})};
// GET USUARIOS
/*getUsuer():Observable<Usuario[]>{
  return this.http.get<Usuario[]>(this.url);
}*/
///
getRol():Observable<Rol[]>{
  return this.http.get<Rol[]>(this.url,{headers:this.agregarAuthorizationHeader()})
}



//Crea cuenta usuario

/*
/// rol
/*Crol(rol:Rol):Observable<Rol>{
  return this.http.post<Rol>(this.url,rol)
}
*/
getuser():Observable<Usuario[]>{
  return this.http.get<Usuario[]>('http://localhost:8088/geolib/usuarios',{headers:this.agregarAuthorizationHeader()});
}


  ///obtener cuenta email
  getemail(email:string):Observable<Cuenta>{
  return this.http.get<Cuenta>(this.url+'/'+email)};

}///fin
