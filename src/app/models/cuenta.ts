import { Rol } from "./rol";
import { Usuario } from "./usuario";

export class Cuenta {
    constructor() {
      this.idCuenta=this.idCuenta;
       this.usuario = new Usuario();
        //this.rol = new Rol();
      }
    idCuenta!:number;
    email!:string;
    fechaCreacion?:Date;//Date ojo
    contrasena!:string; 
    usuario!:Usuario;
    roles:Rol[]=[];
    enabled:boolean;
    opcion:string;
    
}
