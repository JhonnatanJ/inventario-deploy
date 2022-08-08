import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-personalizado',
  templateUrl: './reporte-personalizado.component.html',
  styleUrls: ['./reporte-personalizado.component.css']
})
export class ReportePersonalizadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("hola desde reporte perxonalizado")
  }

}
