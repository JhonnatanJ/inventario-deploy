import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuenta } from 'src/app/models/cuenta';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { CuentaService } from 'src/app/services/cuenta.service';
import { ROLService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public page!:number;
  cuentas!:Cuenta[];
 // rol!:Rol[];
  users!:Usuario[];
  cuenta:Cuenta=new Cuenta();
  //roles:Rol= new Rol();
  constructor(private cuentaService:CuentaService,private router:Router) { }
  
  ngOnInit() {
   this.cuentaService.getAll().subscribe(
    c =>{this.cuentas=c; console.log(this.cuentas)}
   );

   /*///getAll es metodo de cuentas services
   this.rolService.getAllid().subscribe(
    r =>this.roles=r
   );

   this.userService.getAllus().subscribe(
    u =>this.users=u
   ); */
  }
  delete(cuenta:Cuenta):void{
    console.log("hello form delete");///cuenta.idCuenta
    this.cuentaService.delete(cuenta.idCuenta).subscribe(
      res=>this.cuentaService.getAll().subscribe(
        response=>this.cuentas=response));
  }
}
