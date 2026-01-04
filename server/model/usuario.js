export class Usuario {
    constructor({nombre, contrasenia, chats=[], id=undefined}) {
        this.nombre = nombre
        this.contrasenia = contrasenia
        this.chats = chats || []
        this.id = id
    }

    agregarChat(chat) {
        this.chats.push(chat)
    }
}