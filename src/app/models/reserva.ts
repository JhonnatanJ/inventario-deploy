import { Cuenta } from "./cuenta";
import { DetalleReserva } from "./detalle-reserva";
import { Usuario } from "./usuario";

export class Reserva {
    constructor(){
        this.cuenta=new Cuenta();
        this.usuario=new Usuario();
        this.detalleReservas=[new DetalleReserva()];
    }
    idReserva!:number;
    fechaCreacion!:Date;//Date ojo
    fechaAbono!:Date;
    valorTotal!:number;
    saldo!:number;
    abono!:number;
    cuenta!:Cuenta;
    usuario!:Usuario;
    detalleReservas!:DetalleReserva[];
}
