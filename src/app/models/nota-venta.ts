import { Cuenta } from "./cuenta";
import { Detalle } from "./detalle";


export class NotaVenta {
    constructor(){
   this.cuenta=new Cuenta();


    }
    idNotaventa!:number;
    cuenta!:Cuenta;
    fechaRegistro:string="";//Date OJO
   valorTotal!:number;
    detalles:Detalle[]=[];
    opcion:string;

    calcularGranTotal():number{
        this.valorTotal=0;
        this.detalles.forEach((item:Detalle)=>{
            this.valorTotal=this.valorTotal+item.calcularTotal();
        });
        return this.valorTotal;
    }

    
}
