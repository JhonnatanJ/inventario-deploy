import { Component, OnInit } from '@angular/core';
import { Cuenta } from '../../models/cuenta';
import { ReporteService } from '../../services/reporte.service';
import { NotaVenta } from '../../models/nota-venta';
import { Reserva } from '../../models/reserva';

@Component({
  selector: 'app-reporte-diario',
  templateUrl: './reporte-diario.component.html',
  styleUrls: ['./reporte-diario.component.css']
})
export class ReporteDiarioComponent implements OnInit {
//----------VARIABLES PARA FECHAS
  date:number = Date.now();
  fechaActual:string = this.formatDate(new Date(this.date));
  horaActual:string = new Date(this.date).toTimeString();
//-----------VARIABLES PARA ENTIDADES
  cuenta:Cuenta = new Cuenta;
  notasventa:NotaVenta[] = [];
  reservas:Reserva[] = [];
  indice: number = 0;

//VARIABLES PARA CALCULOS
  totalVentasDiario:number = 0;
  totalAbonosDiario:number = 0;
  totalDiario:number = 0;

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.cargarDatosCuenta();
    this.cargarNotasVenta();
    this.cargarReservas();

  }

  //------------------------------------------------- FUNCIONES PARA CARGAR DATOS
  cargarDatosCuenta(){
    let idCuenta = JSON.parse(sessionStorage.getItem("cuenta")!).idCuenta;
    this.reporteService.getCuenta(idCuenta).subscribe(
      cuenta => {
        this.cuenta = cuenta;        
      }
    )
  }

  cargarNotasVenta(){
    this.reporteService.getNotaVenta(this.fechaActual).subscribe(
      notaVenta => {
        this.notasventa = notaVenta;
        this.calcularTotalDiarioVentas();
      }
    )
  }

  cargarReservas(){
    this.reporteService.getReserva(this.fechaActual).subscribe(
      reserva => {
        this.reservas = reserva;
        this.calcularTotalDiarioAbonos();
      }
    )
  }


  //-------------------------------FUNCIONES PARA CALCULAR TOTALES
  calcularTotalDiarioVentas(){
    for(let notaventa of this.notasventa){
      this.totalVentasDiario += notaventa.valorTotal;      
    }
    this.totalDiario += this.totalVentasDiario;
  }

  calcularTotalDiarioAbonos(){
    for(let reserva of this.reservas){
      this.totalAbonosDiario += reserva.abono;      
    }
    this.totalDiario += this.totalAbonosDiario;
  }

  calcularTotalDiario(){
    this.totalDiario = this.totalAbonosDiario + this.totalVentasDiario;
  }

  //------------------------------------ FUNCIONES PARA FECHA
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
  formatDate(date:Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),      
    ].join('-');
  }
}
