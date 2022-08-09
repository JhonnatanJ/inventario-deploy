import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/user-login.service';
import { UserLoginComponent } from '../user-login/user-login.component';
import Swal from 'sweetalert2';
import { CuentaService } from 'src/app/services/cuenta.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
 bandera=true;
  constructor(private router:Router,public userloginService:UserLoginService, public cuentaService:CuentaService) { }

  logout():void{
    let username=this.userloginService.cuenta.email;
    this.userloginService.logout();
    Swal.fire('Logout',`Adios ${username}, has cerrado session con éxito!`,'success');
    this.router.navigate(['/login']);
  }



  ngOnInit() {
    //this.cuentaService.mostrarUs=true;
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
 
  usuarios(){
    this.router.navigate(["usuarios"])
  }
}
