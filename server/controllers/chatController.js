import {usuarioADTO} from "./usuarioController.js";

export class ChatController {
    constructor(chatRepo){
        this.chatRepo = chatRepo
    }
}

export function chatADTO(chat){
    return {
        id: chat.id,
        nombre: chat.nombre,
        mensajes: chat.mensajes.map(m => {
            return {
                autor: usuarioADTO(m.autor),
                contenido: m.contenido}
            }
        )
    }
}
