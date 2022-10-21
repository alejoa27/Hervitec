
export class AddService{
    nombre: string;
    categoria: string;
    descripcion: string;
    constructor(nombre: string, categoria: string, descripcion: string){
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
    }
}