import { Reserva } from "./reserva";

export class Usuario {
        ci?:string;
        nombres!:string;
        apellidos?:string;
        telefono?:string; 
        reserva:Reserva[]=[];///ojo
}
