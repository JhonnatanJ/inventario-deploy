import { Component, OnInit } from '@angular/core';
import { Cuenta } from '../../models/cuenta';
import { ReporteService } from '../../services/reporte.service';
import { NotaVenta } from '../../models/nota-venta';
import { Reserva } from '../../models/reserva';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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

  //------------------------------------------------------------------------- GENERAR PDF CON PDF MAKER

  createPdf(){
    const pdfDefinition: any = {
      info: {
        title: `Reporte Diario_${this.fechaActual}`,
        author: `${this.cuenta.usuario.nombres} + ' ' + ${this.cuenta.usuario.apellidos}`,
        subject: 'Reporte de Ventas',
        keywords: 'Reporte',
        creator: 'Libreria GeoMundo'        
        },
        
      content: [
        {
          text: `Fecha: ${new Date().toLocaleString()}`,
          alignment: 'right',
        },
        {
          text: 'Libreria GEOMUNDO',
          fontSize: 16,
          alignment: 'start',          
          color: '#2d8fd4',
          bold: true, 
          margin: [0, 0, 0, 20]     
        },          
        {
          text: 'Reporte de Ingresos Diario',
          fontSize: 16,                   
          alignment: 'center',
          margin:[0,0,0,20]
        },
        {
          text: 'DATOS:',
          style: 'sectionHeader'
        },
          {
            text: `Generado por: ${this.cuenta.usuario.nombres + ' ' + this.cuenta.usuario.apellidos}`,
            margin:[0,0,0,5]
          },
          {
            text: `Email: ${this.cuenta.email}`,
            margin: [0,0,0,15],
          },
          {
            text: `Descripcion: Reporte de Ventas y Abonos del día ${this.fechaActual}`,
            margin: [0,0,0,15],
          },
        {
          text: 'INGRESOS:',
          style: 'sectionHeader'
        }, 
        {
          text: 'Notas de Venta'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', '*', 'auto'],
            body: [
              ['ID', 'Vendedor', 'Libros', 'Valor Total'],
              ...this.notasventa.map(notaventa => ([notaventa.idNotaventa, notaventa.cuenta.email, notaventa.detalles.map(detalle =>([`${'('+detalle.cantidad}`+')'+ `${detalle.libro.titulo}`])), {text:`$${notaventa.valorTotal.toFixed(2)}`, bold:true}])),
              [{text: 'Total de Ventas Diario', colSpan: 3, bold:true},{},{},{text:`$${this.totalVentasDiario.toFixed(2)}`, bold:true}]
            ]
          }
        },
        {
          text: 'Reservas',
          margin:[0,20,0,0],
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', '*', 'auto', 'auto', 'auto'],
            body: [
              ['ID', 'Vendedor', 'Cliente', 'Libros', 'Abono', 'Saldo', 'Valor Total'],
              ...this.reservas.map(reserva => ([reserva.idReserva, reserva.cuenta.email, reserva.usuario.ci, reserva.detalleReservas.map(detalle =>([`${'('+detalle.cantidad}`+')'+ `${detalle.libro.titulo}`])), {text: `$${reserva.abono.toFixed(2)}`, bold:true}, {text:`$${reserva.saldo.toFixed(2)}`}, {text:`$${reserva.valorTotal.toFixed(2)}`}])),
              [{text: 'Total de Abonos Diario', colSpan: 4, bold:true}, {},{},{}, {text:`$${this.totalAbonosDiario.toFixed(2)}`, bold:true},{},{},]
            ],
            margin:[0,0,0,20]
          }
        },
        {
          text: `TOTAL DE INGRESOS DIARIO: $${this.totalDiario.toFixed(2)}`,
          style: 'sectionHeader',
          margin:[0,20,0,0]
        },      
      ],
      styles: {
        sectionHeader: {
          bold: true,
          fontSize: 14,
          margin: [0,0,0, 10]          
        }
      }
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}
