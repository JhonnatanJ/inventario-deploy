import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotaVenta } from 'src/app/models/nota-venta';
import { NotaventaService } from 'src/app/services/notaventa.service';
//import { ModalNotaVComponent } from '../modal-nota-v/modal-nota-v.component';
@Component({
  selector: 'app-nota-venta',
  templateUrl: './nota-venta.component.html',
  styleUrls: ['./nota-venta.component.css']
})
export class NotaVentaComponent implements OnInit {
 notas:NotaVenta[];
 nota:NotaVenta=new NotaVenta();
  constructor( public modal:NgbModal, private notaventaService:NotaventaService) { }

  ngOnInit(){
    this.notaventaService.getAll().subscribe(n=>this.notas=n);
    ////udemi form//
 
  }
 
  
}
