import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Cuenta } from '../models/cuenta';
import { DatosLogin } from '../models/datos-login';
import { CuentaService } from './cuenta.service';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})

export class UserLoginService {
  //http://localhost:8088/geolib/cuentas/login/jhonnatanbm@gmail.com_admin
  //private log :string="http://localhost:8088/geolib/cuentas/login";
  //private readonly mockUser:DatosLogin=new DatosLogin('admin','admin');
  
  iniciar=false;

  private _cuenta!:Cuenta;
  private _token!:string;
  constructor(private router:Router, private http:HttpClient){}

  public get cuenta():Cuenta{
    if(this._cuenta!=null){
      return this._cuenta;
    }else if(this._cuenta == null && sessionStorage.getItem('cuenta')!=null){
      this._cuenta= JSON.parse(sessionStorage.getItem('cuenta') ) as Cuenta;
      return this._cuenta;
    }
    return new Cuenta();
  }

  public get token():string{
    if(this._token!=null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token')!=null){
      this._token= sessionStorage.getItem('token')  ;
      return this._token;
    }
    return null || "[]";
  }

////UDEMI
login(cuenta:Cuenta):Observable<any>{
  this.iniciar=true;
  const urlEndpoint='http://localhost:8088/oauth/token';

  const credenciales= btoa('clienteLibreria'+':'+'12345');

  const httpheaders=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
'Authorization':'Basic ' + credenciales});
let params=new URLSearchParams();
params.set('grant_type', 'password');
params.set('username',cuenta.email);
params.set('password',cuenta.contrasena);

console.log(params.toString());
  return this.http.post<any>(urlEndpoint,params.toString(),{headers:httpheaders});
  
}


guardarUsuario(accessToken:string):void{
  let payload=this.obtenerDatosToken(accessToken);
  this._cuenta=new Cuenta();
  this._cuenta.idCuenta=payload.id_cuenta;
  this._cuenta.usuario.nombres = payload.nombres;
  this._cuenta.usuario.apellidos = payload.apellidos;
  this._cuenta.email= payload.user_name;
  this._cuenta.roles=payload.authorities;
  sessionStorage.setItem("cuenta",JSON.stringify(this._cuenta));

}
guardarToken(accessToken:string):void{
  this._token=accessToken;
  sessionStorage.setItem('token',accessToken);
}

obtenerDatosToken(accessToken:string):any{
 console.log(accessToken);
  if(accessToken!=null){
    return JSON.parse(atob(accessToken.split(".")[1]));
    
  }
  return null;
}

  isAuthenticated():boolean{
    let payload=this.obtenerDatosToken(this.token);
    if(payload !=null && payload.user_name && payload.user_name.length>0 ){    
      return true;
    }
    return false;
  }
  
  hasRole(role:string):boolean{///ojo con rol
     
  // let aux= JSON.parse(sessionStorage.getItem("cuenta"));
  if(role==JSON.parse(sessionStorage.getItem("cuenta")).roles[0]){
    return true;
   } 
    return false;
  }

  logout(){
    this.iniciar=false;
    this._token=null;
    this._cuenta=null;
    sessionStorage.clear();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cuenta");

  }

}
