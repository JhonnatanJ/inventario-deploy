import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva';
import { ReservasService } from 'src/app/services/reservas.service';
import { ModalReservaService } from './detalle-reserva/modal-reserva.service';

@Component({
  selector: 'app-list-reserva',
  templateUrl: './list-reserva.component.html',
  styleUrls: ['./list-reserva.component.css']
})
export class ListReservaComponent implements OnInit {

  ///busqueda
  idR:number;
  search:string= "";//cliente
  vendedor:string="";
  fecha:string="";
  opcion:string;


  public page!:number;

  reservas!:Reserva[];///LISTA
  reserva:Reserva=new Reserva();

  reservaSeleccionada:Reserva;
  constructor(private reservaService:ReservasService, private modalRservice:ModalReservaService ) { }

  ngOnInit(): void {
    this.reservaService.getAll().subscribe((r=>{this.reservas=r}));
  }

  cargarDatos():void{
    this.reservaService.getAll().subscribe((r=>{this.reservas=r}));
  }

  openSM(reserva:Reserva)
  {
    this.reservaSeleccionada=reserva;
    this.modalRservice.openModal();
  }

}
