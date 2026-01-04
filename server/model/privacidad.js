export class Privacidad {
    constructor(nombre) {
        this.nombre = nombre;
    }

    getNombre() {
        return this.nombre;
    }

    static fromString(token){
        return Object.values(Privacidad).find(estado => estado.nombre === token)
    }
}

Privacidad.PUBLICO = new Privacidad("PUBLICO");
Privacidad.PRIVADO = new Privacidad("PRIVADO");
