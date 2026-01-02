import chatModel from "./../schemas/chatSchema.js"
import {Chat} from "../model/chat.js";
import {Mensaje} from "../model/mensaje.js";
import {Usuario} from "../model/usuario.js";
import {usuarioDeDB} from "./usuarioRepositorio.js"

export class ChatRepositorio {
    constructor() {
        this.model = chatModel
    }

    async findById(id) {
        const result = this.model.findOne({id: id})

        if (!result) {
            // exception
        }
        return chatDeDB(result)
    }
}

export function chatDeDB(chat) {

    const mensajes = chat.mensajes.map(m => {
        const usuario = new Usuario(usuarioDeDB(m.usuario))
        return new Mensaje(usuario, m.contenido, m.fecha, m._id)
    })


    return new Chat({mensajes, id: chat._id})
}