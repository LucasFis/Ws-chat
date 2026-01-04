export class Chat {
    constructor({nombre, descripcion, privacidad,mensajes = [], id = undefined}){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.mensajes = mensajes;
        this.id = id;
        this.privacidad = privacidad;
    }

    getId() {
        return this.id;
    }

    agregarMensaje(mensaje) {
        this.mensajes.push(mensaje);
    }
}