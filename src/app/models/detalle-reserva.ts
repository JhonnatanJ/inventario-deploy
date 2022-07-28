import { Libro } from "./libro";

export class DetalleReserva {
    constructor(){
        this.isbn= new Libro();
    }

    idDetalleReserva!:string;
    cantidad!:number;
    subtotal!:number;
    isbn!:Libro;
}
