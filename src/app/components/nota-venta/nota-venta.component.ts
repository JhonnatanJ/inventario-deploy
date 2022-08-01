import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotaVenta } from 'src/app/models/nota-venta';
import { NotaventaService } from 'src/app/services/notaventa.service';
import { modalService } from './detalle-nota-v/modal.service';
//import { ModalNotaVComponent } from '../modal-nota-v/modal-nota-v.component';

@Component({
  selector: 'app-nota-venta',
  templateUrl: './nota-venta.component.html',
  styleUrls: ['./nota-venta.component.css']
})
export class NotaVentaComponent implements OnInit {

  search:number;
  
  public page!:number;

  venta:NotaVenta[];
  //notas:NotaVenta;
 nota:NotaVenta=new NotaVenta();
 notaSeleccionada:NotaVenta;

  constructor( private notaventaService:NotaventaService, private modalService:modalService) { }

  ngOnInit(){
    this.notaventaService.getAll().subscribe(n=>this.venta=n);  
  }

  openSM(notaVenta:NotaVenta)
  {
    this.notaSeleccionada=notaVenta;
    this.modalService.openModal();
  } 

}
