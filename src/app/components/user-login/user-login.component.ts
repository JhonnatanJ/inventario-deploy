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
 // login=false;
  //loginSuscription!:Subscription;
  //entrar=true;
     isFormValid=false;//false
     areCredentialsInvalid=false//false
     cuenta:Cuenta;
  constructor(private router:Router, private userloginService:UserLoginService) {
    this.cuenta=new Cuenta();
   }//,private userLoginService:UserLoginService
     
      vista=true;///amage
  ngOnInit(){
    if(JSON.parse(sessionStorage.getItem("token")!)!=null){
      if(this.userloginService.isAuthenticated()){
        Swal.fire('Login',`Bienvenido ${this.userloginService.cuenta.email} ya estas autenticado!`,'info' )
         this.router.navigate(['/lista']);
      }
    }
    
  }
  ///UDEMI
  login():void{
    console.log(this.cuenta);
    if(this.cuenta.email==null || this.cuenta.contrasena== null){
      Swal.fire('Error Login','Email o Contraseña Vacias!','error')
      return;
    }

    this.userloginService.login(this.cuenta).subscribe(res=>{
      console.log(res);
     // let payload=JSON.parse(atob(res.access_token.split(".")[1]));
      

      this.userloginService.guardarUsuario(res.access_token);
      this.userloginService.guardarToken(res.access_token);

      let cuenta= this.userloginService.cuenta;


      this.router.navigate(['/lista']);
      Swal.fire('Login',`Bienvenido  ${cuenta.email}, has iniciado sesion con éxito!`, 'success' );
    }, err=>{
     if(err.status ==400 || err.status==401){
      Swal.fire('Error Login', 'Email o Contraseña Incorrectas!','error');
      this.userloginService.iniciar=false;
     }
     this.userloginService.iniciar=false;
    }

    );

  }






/*
////
  onSubmit(signInform:NgForm){
   // console.log(signInform.value);
    if(!signInform.valid){
      this.isFormValid=true;//true
      this.areCredentialsInvalid=false;//false
      return;     
    }
    this.checkCredential(signInform);
     
  }

  private checkCredential(signInform:NgForm){
    const signinData=new DatosLogin(signInform.value.login,signInform.value.password);
      if(!this.userloginService.autenticar(signinData)){//authentic
          this.isFormValid=false;//false
          this.areCredentialsInvalid=true;//true         
      }
    
  }*/
    
}
