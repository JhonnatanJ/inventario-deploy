import { Libro } from "./libro";

export class Detalle {
    constructor(){
        this.libro=new Libro();
        this.cantidad=this.cantidad;
    }
    idDetalle!:string;
    libro!:Libro;
    cantidad:number=1;
    subtotal!:number;

    public calcularTotal():number{
        return this.cantidad*this.libro.precioUnitario;
    }
    
}
