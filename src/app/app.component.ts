import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from './services/user-login.service';
//import { FormControl,FormGroup,FormBuilder, FormArray } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 //login:boolean=false;
constructor(public userLogService:UserLoginService){}

/*salida(){
  this.userLogService
}*/

// logout(){
//   this.userLogService.saliendo();//amage y real
// }
}


