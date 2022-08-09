import { Component, OnInit } from '@angular/core';
import { Cuenta } from '../../models/cuenta';
import { ReporteService } from '../../services/reporte.service';
import { NotaVenta } from '../../models/nota-venta';
import { Reserva } from '../../models/reserva';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Libro } from '../../models/libro';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporte-personalizado',
  templateUrl: './reporte-personalizado.component.html',
  styleUrls: ['./reporte-personalizado.component.css']
})
export class ReportePersonalizadoComponent implements OnInit {
//----------VARIABLES PARA FECHAS
  date:number = Date.now();
  fechaActual:string = this.formatDate(new Date(this.date));
  horaActual:string = new Date(this.date).toTimeString();

  fechaConsulta:string = this.fechaActual;

//-----------VARIABLES PARA ENTIDADES
  cuenta:Cuenta = new Cuenta;
  notasventa:NotaVenta[] = [];
  reservas:Reserva[] = [];
  libros: Libro[] = [];
  librosVacio: Libro[] = [];
  librosFecha: Libro[] = [];
  indice: number = 0;

//VARIABLES PARA CALCULOS
  totalVentasDiario:number = 0;
  totalAbonosDiario:number = 0;
  totalDiario:number = 0;

//VARIABLES PARA OPCIONES DE REPORTE
  generarReporte:boolean = false;
  opcionReporte:number = 1; 
  opcion1:boolean = false;
  opcion2:boolean = false;
  opcion3:boolean = false;
  opcion4:boolean = false;


  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.cargarDatosCuenta();
  }

  //FUNCION PARA SELECCIONAR OPCION
  activarOpcion()
  {
    if(this.opcionReporte == 1){
        this.generarReporte = true;
        this.opcion1 = true;
        this.opcion2 = false;
        this.opcion3 = false;
        this.opcion4 = false;
        this.cargarLibrosStock();
    }

    if(this.opcionReporte == 2){
      this.generarReporte = true;
      this.opcion1 = false;
      this.opcion2 = true;
      this.opcion3 = false;
      this.opcion4 = false; 
      this.cargarLibrosStockVacio();
    }

    if(this.opcionReporte == 3){
      console.log(this.fechaConsulta);      
      this.generarReporte = true;
      this.opcion1 = false;
      this.opcion2 = false;
      this.opcion3 = true;
      this.opcion4 = false; 
      this.cargarLibrosFechaRegistro(this.fechaConsulta);
    }

    if(this.opcionReporte == 4){
      this.totalDiario=0;
      this.totalAbonosDiario=0;
      this.totalVentasDiario=0;
      this.generarReporte = true;
      this.opcion1 = false;
      this.opcion2 = false;
      this.opcion3 = false;
      this.opcion4 = true;
      this.cargarReservas(this.fechaConsulta);
      this.cargarNotasVenta(this.fechaConsulta);
    }
    
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

  cargarNotasVenta(fecha:string){
    this.reporteService.getNotaVenta(fecha).subscribe(
      notaVenta => {
        this.notasventa = notaVenta;
        this.calcularTotalDiarioVentas();
      }
    )
  }

  cargarReservas(fecha:string){
    this.reporteService.getReserva(fecha).subscribe(
      reserva => {
        this.reservas = reserva;
        this.calcularTotalDiarioAbonos();
      }
    )
  }

  cargarLibrosStock(){
    this.reporteService.getLibroStock().subscribe(
      libro => {
        this.libros = libro;        
      }
    )
  }

  cargarLibrosStockVacio(){
    this.reporteService.getLibroStockVacio().subscribe(
      libro => {
        this.librosVacio = libro;        
      }
    )
  }

  cargarLibrosFechaRegistro(fecha:string){
    this.reporteService.getLibroFechaRegistro(fecha).subscribe(
      libro => {
        this.librosFecha = libro;        
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
            text: `Descripcion: Reporte de Ventas y Abonos del día ${this.fechaConsulta}`,
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


  // ====================================================================== OPCION 1 =====================================================

  createPdfLibrosStock(){
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
          text: 'Reporte de Libros',
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
            text: `Descripcion: Reporte de Libros que contienen 1 o más existencias en stock`,
            margin: [0,0,0,15],
          },
        {
          text: 'LIBROS:',
          style: 'sectionHeader'
        }, 
        {
          text: 'Libros con Stock'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['ISBN', 'Título', 'Autor', 'Editorial', 'Stock', 'Precio Unitario'],
              ...this.libros.map(libro => ([libro.isbn, libro.titulo, libro.autores.map(autor =>([`${autor.nombre}`])), libro.editoriales.map(editorial =>([`${editorial.nombre}`])), libro.stock, {text:`$${libro.precioUnitario.toFixed(2)}`}])),
            ]
          }
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


  // ====================================================================== OPCION 2 =====================================================

  createPdfLibrosStockVacio(){
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
          text: 'Reporte de Libros',
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
            text: `Descripcion: Reporte de Libros que no contienen existencias en stock`,
            margin: [0,0,0,15],
          },
        {
          text: 'LIBROS:',
          style: 'sectionHeader'
        }, 
        {
          text: 'Libros sin Stock'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['ISBN', 'Título', 'Autor', 'Editorial', 'Stock', 'Precio Unitario'],
              ...this.librosVacio.map(libro => ([libro.isbn, libro.titulo, libro.autores.map(autor =>([`${autor.nombre}`])), libro.editoriales.map(editorial =>([`${editorial.nombre}`])), libro.stock, {text:`$${libro.precioUnitario.toFixed(2)}`}])),
            ]
          }
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

// ====================================================================== OPCION 3 =====================================================

    createPdfLibrosFecha(){
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
            text: 'Reporte de Libros',
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
              text: `Descripcion: Reporte de Libros registrados el ${this.fechaConsulta}`,
              margin: [0,0,0,15],
            },
          {
            text: 'LIBROS:',
            style: 'sectionHeader'
          }, 
          {
            text: 'Libros sin Stock'
          },
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
              body: [
                ['ISBN', 'Título', 'Autor', 'Editorial', 'Stock', 'Precio Unitario'],
                ...this.librosFecha.map(libro => ([libro.isbn, libro.titulo, libro.autores.map(autor =>([`${autor.nombre}`])), libro.editoriales.map(editorial =>([`${editorial.nombre}`])), libro.stock, {text:`$${libro.precioUnitario.toFixed(2)}`}])),
              ]
            }
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
