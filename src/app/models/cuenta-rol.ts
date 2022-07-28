import { Cuenta } from "./cuenta";
import { Rol } from "./rol";

export class CuentaRol {
    idCuenta!:Cuenta;
    idRol!:Rol;
    fechaInicio!:string;//Date ojo
    fechaFin!:string;//Date ojo
}
