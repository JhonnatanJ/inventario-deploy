import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuenta } from 'src/app/models/cuenta';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { CuentaService } from 'src/app/services/cuenta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  
 
///busquedas
  search:string= "";//nombres
  ced:string=""; ///cedula
  correo:string="";//email

  public page!:number;
  cuentas!:Cuenta[];
 // rol!:Rol[];
  users!:Usuario[];
  cuenta:Cuenta=new Cuenta();
  //roles:Rol= new Rol();
  constructor(public cuentaService:CuentaService,private router:Router) { }
  
  ngOnInit() {
   this.cuentaService.getAll().subscribe(
    c =>{this.cuentas=c; console.log(this.cuentas)}
   );

   this.cuentaService.habilitar=false;
  }
  delete(cuenta:Cuenta):void{

    Swal.fire({
      title: '¿Estas Seguro?',
      //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Deshabilitar!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("hello form delete");///cuenta.idCuenta
        this.cuentaService.delete(cuenta.idCuenta).subscribe(
          res=>this.cuentaService.getAll().subscribe(
            response=>this.cuentas=response));

        //
        Swal.fire(
          'Deshabilitado!',
          'El Usuario ha sido Deshabilitado',
          'success'
        )
      }
    })      
  }

  

  imprimirEstado(estado: boolean): string{
    if(estado){
      return 'Habilitado';
    }
    else{
      return 'Desabilitado';
    }
  }
}
