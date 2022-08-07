import { Libro } from "./libro";

export class DetalleReserva {
    constructor(){
        this.libro= new Libro();
    }

    idDetalleReserva:string="";
    cantidad:number=1;
    subtotal!:number;
    libro!:Libro;

    public calcularTotal():number{
        return this.cantidad*this.libro.precioUnitario;
    }
}
