import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/models/reserva';
import { ReservasService } from 'src/app/services/reservas.service';
import Swal from 'sweetalert2';
import { ModalReservaService } from './modal-reserva.service';

@Component({
  selector: 'app-detalle-reserva',
  templateUrl: './detalle-reserva.component.html',
  styleUrls: ['./detalle-reserva.component.css']
})
export class DetalleReservaComponent implements OnInit {

  @Input() reserva:Reserva;
  
  // reservaA:Reserva[]=[];
  reservas:Reserva=new Reserva();
  nuevoA:number=0;

  constructor( public modalRservice:ModalReservaService, 
    private reservaservice:ReservasService,
    private router:Router,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    
   
  // this.cargar();
  this.reservaservice.get(this.reserva.idReserva).subscribe(r=>{this.reservas=r;console.log(this.reservas)});
  
  }

  suma(){

    this.reservas.abono=this.reservas.abono+this.nuevoA;
    console.log(this.reservas)
    this.reservaservice.update(this.reservas.idReserva,this.reservas).subscribe(
      r=>this.router.navigate(['/reservas'])   )
  }

  cerrarModal(){
    this.modalRservice.cerrarModal();
  }

cargar(){
this.activatedRoute.params.subscribe(
  r=>{
  let id =r['id'];
  
  if(id){
    this.reservaservice.get(id).subscribe(
      re=>{this.reservas=re;console.log(re)});
  }else{
    Swal.fire('OJO',`no encontrado`,'info');
  }

})
}

}
