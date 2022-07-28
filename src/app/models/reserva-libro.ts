import { Libro } from "./libro";
import { Reserva } from "./reserva";

export class ReservaLibro {
    idReserva!:Reserva;
    isbn!:Libro;
    precioSubTotalR!:number;
    cantidad!:number;
}
