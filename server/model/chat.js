export class Chat {
    constructor({nombre, descripcion,mensajes = [], id = undefined}){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.mensajes = mensajes;
        this.id = id;
    }

    getId() {
        return this.id;
    }
}