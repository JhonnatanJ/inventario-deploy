import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatosLogin } from 'src/app/models/datos-login';
import { UserLoginService } from 'src/app/services/user-login.service';
import { Cuenta } from 'src/app/models/cuenta';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

     isFormValid=false;//false
     areCredentialsInvalid=false//false
     cuenta:Cuenta;
  constructor(private router:Router, private userloginService:UserLoginService) {
    this.cuenta=new Cuenta();
   }
     
      vista=true;///amage
  ngOnInit(){
    
      if(this.userloginService.isAuthenticated()){
        Swal.fire({title:'Inicio de Sesión',icon:'info',text:`Bienvenido ${this.userloginService.cuenta.email} ya estas autenticado!`,timer:1200, showConfirmButton:false});
        this.userloginService.iniciar=true;
         this.router.navigate(['/lista']);
      //}
    }
    
  }
  ///UDEMI
  login():void{
    
    if(this.cuenta.email==null || this.cuenta.contrasena== null){
      Swal.fire('Error Inicio de Sesión','Email o Contraseña Vacias!','error')
      return;
    }

    this.userloginService.login(this.cuenta).subscribe(res=>{
      
     // let payload=JSON.parse(atob(res.access_token.split(".")[1]));
      

      this.userloginService.guardarUsuario(res.access_token);
      this.userloginService.guardarToken(res.access_token);

      let cuenta= this.userloginService.cuenta;


      this.router.navigate(['/lista']);
      Swal.fire({title:'Inicio de Sesión',icon:'success',text:`Bienvenido  ${cuenta.email}, has iniciado sesión con éxito!`, timer: 1500, showConfirmButton:false});
    }, err=>{
     if(err.status ==400 || err.status==401){
      Swal.fire('Error Inicio de Sesión', 'Email o Contraseña Incorrectas!','error');
      this.userloginService.iniciar=false;
     }
      this.userloginService.iniciar=false;
    }

    );

  }

    
}
