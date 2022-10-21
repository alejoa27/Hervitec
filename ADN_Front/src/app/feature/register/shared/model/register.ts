
export class Register{
    apellido: string;
    email: string;
    nombre: string;
    password: string;
    ciudad: string;
    constructor(email: string, password: string, apellido: string, ciudad: string, nombre: string ){
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.apellido = apellido;
    }
}