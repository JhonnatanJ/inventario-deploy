import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuenta } from 'src/app/models/cuenta';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { CuentaService } from 'src/app/services/cuenta.service';
import { ROLService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-forms',
  templateUrl: './usuario-forms.component.html',
  styleUrls: ['./usuario-forms.component.css']
})
export class UsuarioFormsComponent implements OnInit {

  cuenta:Cuenta= new Cuenta();
  cuentas:Cuenta[]=[]
 roles:Rol=new Rol(); 
  usuario:Usuario[]=[];
  rol!:Rol[]; 
  flag!:boolean;
  estado:string='';

  Miformulario!:FormGroup;
  constructor( private cuentaServicio:CuentaService,private router:Router,private activatedRoute:ActivatedRoute, private fb:FormBuilder) { 
  /* */
  this.flag=true
  }

  ngOnInit(){
    this.cuentaServicio.getRoles().subscribe(
      response=>this.rol=response
    )
    this.Miformulario=this.fb.group({
      roles:this.fb.array([this.fb.group({nombre:['']})])
    });

   
    this.cargar();
  }

   onSubmit(formValue:any){
     const cuenta=new Cuenta();
    //  cuenta.email=formValue.email;
    //  cuenta.contrasena=formValue.contrasena;
    //  cuenta.usuario.nombres=formValue.usuario;
    //  cuenta.usuario.apellidos=formValue.usuario;
    //  cuenta.usuario.ci=formValue.usuario;
    //  cuenta.usuario.telefono=formValue.usuario;
     cuenta.roles=formValue.roles;

     this.cuentaServicio.create(cuenta).subscribe(
       rep=> this.cuenta=rep);
   }

   get getRoles(){
     return this.Miformulario.get('roles') as FormArray;
   }
   addRol(){
     const control=<FormArray>this.Miformulario.controls['roles'];
     control.push(this.fb.group({nombre:[]}));
   }

   

  cargar():void{
   this.activatedRoute.params.subscribe(
    a=>{
      let id=a['id'];
      if(id){
        this.cuentaServicio.get(id).subscribe(
          es=>this.cuenta=es);
      }})
  }

  /*createRol(roles?:string):void{
    this.roles.nombre=roles;
    console.log(this.roles.nombre);
    this.cuentaServicio.createRol(this.cuenta).subscribe(
      rep=> this.cuenta=rep);
      /* this.cuentaServicio.createRol(this.roles).subscribe(
      rep=> this.roles=rep); */
 // }

  create():void{
    
  // this.createRol(this.roles.nombre); //this.createRol(this.cuenta.rol.nombre);
   console.log(this.roles);
   this.cuenta.roles.unshift(this.roles);
   console.log(this.cuenta);
    this.cuentaServicio.create(this.cuenta).subscribe
    (res=> this.router.navigate(['/usuarios']));
   
    if(this.estado =='Habilitado'){
      this.cuenta.enabled=true;
    }
    else{
      this.cuenta.enabled=false;
    }
    /*this.cuentaServicio.create(this.cuenta).subscribe
    (res=> console.log(this.cuenta)); */    
  }
  

  update():void{
    this.cuentaServicio.update(this.cuenta).subscribe(
      u=>this.router.navigate(['/usuarios']));
  }

}
