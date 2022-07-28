import { Cuenta } from "./cuenta";
import { Libro } from "./libro";

export class CuentaLibro {
    idCuenta!:Cuenta;
    ISBN!:Libro;
    fechaCuentaLibro!:string;//Date OJO
}
