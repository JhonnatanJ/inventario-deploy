import { Cuenta } from "./cuenta";
import { DetalleReserva } from "./detalle-reserva";
import { Usuario } from "./usuario";

export class Reserva {
    constructor(){
        this.cuenta=new Cuenta();
        this.usuario=new Usuario();
       // this.detalleReservas=[new DetalleReserva()];
    }
    idReserva!:number;
    fechaCreacion!:string;//Date ojo
    fechaAbono!:Date;
    valorTotal!:number;
    saldo!:number;
    abono!:number;
    cuenta!:Cuenta;
    usuario!:Usuario;
    detalleReservas:DetalleReserva[]=[];

    

    calcularGranTotal():number{
        this.valorTotal=0;
        this.detalleReservas.forEach((item:DetalleReserva)=>{
            this.valorTotal=this.valorTotal+item.calcularTotal();
        });
        return this.valorTotal;
        
    }
}
