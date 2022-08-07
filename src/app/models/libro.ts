import { Autor } from "./autor";
import { Cuenta } from "./cuenta";
import { Editorial } from "./editorial";
import { Genero } from "./genero";
import { Imagen } from "./imagen";

export class Libro {
    constructor(){
    // this.autores = new Autor();
        //this.generos=new Genero();
        //this.editoriales=new Editorial();
    this.cuenta=new Cuenta();
    this.imagen=new Imagen();
    }

    isbn!: string;
    titulo!:string;
    descripcion!:string;
    stock!:number;
    precioUnitario!:number;
    fechaRegistro!:Date;
    imagen!:Imagen;
    autores:Autor[]=[];
    generos:Genero[]=[];
    editoriales:Editorial[]=[];
    cuenta!:Cuenta;
    opcion:string;
}
