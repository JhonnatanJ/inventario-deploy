import { Libro } from "./libro";
import { NotaVenta } from "./nota-venta";

export class NotaVentaLibro {
    idNotaVenta!:NotaVenta;
    ISBN!:Libro;
    cantidadNotaVenta!:number;
    precioSubTotalN!:number;

}
