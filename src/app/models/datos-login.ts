export class DatosLogin {
    private login!:string;
    private password!:string;

    constructor(login:string,password:string){
        this.login=login;
        this.password=password;
    }
    getLogin():string{
        return this.login;
    }
    getPassword(){
        return this.password;
    }
}
