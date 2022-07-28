import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/user-login.service';
import { FormControl,FormGroup,FormBuilder, FormArray } from '@angular/forms';
import { UserLoginComponent } from '../user-login/user-login.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Loginformulario!: FormGroup;
 bandera=true;
  constructor(private router:Router,public userloginService:UserLoginService,private fb:FormBuilder) { }

  logout():void{
    let username=this.userloginService.cuenta.email;
    this.userloginService.logout();
    Swal.fire('Logout',`Adios ${username}, has cerrado session con éxito!`,'success');
    this.router.navigate(['/login']);
  }



  ngOnInit() {
   
  }
  //const autor=new Autor();

  onSubmit(){
    
    ////ojo
  }

  formulario(){
    this.router.navigate(["formulario"])
  }
  
  lista(){
    this.router.navigate(["lista"])
  }
  login(){
    this.router.navigate(["login"])
    this.bandera=false;
  }
  // logout1(){
  //   this.userloginService.saliendo();//amage y real
  // }
  usuarios(){
    this.router.navigate(["usuarios"])
  }
}
