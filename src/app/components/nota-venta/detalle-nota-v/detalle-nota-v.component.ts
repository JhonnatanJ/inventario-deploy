import { Component, OnInit, Input } from '@angular/core';
import { NotaVenta } from 'src/app/models/nota-venta';
import { NotaventaService } from 'src/app/services/notaventa.service';
import { modalService } from './modal.service';

@Component({
  selector: 'app-detalle-nota-v',
  templateUrl: './detalle-nota-v.component.html',
  styleUrls: ['./detalle-nota-v.component.css']
})
export class DetalleNotaVComponent implements OnInit {

  @Input() NotaV:NotaVenta;

  constructor(private notaventaService:NotaventaService, public modalService:modalService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }
}
