export class Chat {
    constructor({nombre, mensajes = [], id = undefined}){
        this.nombre = nombre;
        this.mensajes = mensajes;
        this.id = id;
    }

    getId() {
        return this.id;
    }
}