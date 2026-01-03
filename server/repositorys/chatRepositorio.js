import chatModel from "./../schemas/chatSchema.js"
import {Chat} from "../model/chat.js";
import {Mensaje} from "../model/mensaje.js";
import {Usuario} from "../model/usuario.js";
import {usuarioDeDB} from "./usuarioRepositorio.js"
import {ChatNotFoundException} from "../exceptions/ChatNotFound.js";

export class ChatRepositorio {
    constructor() {
        this.model = chatModel
    }

    async findById(id) {
        const result = await this.model.findOne({_id: id})

        if (!result) {
            throw new ChatNotFoundException("El chat ingresado no existe")
        }
        return chatDeDB(result)
    }

    async findAll(){
        const results = await this.model.find({})

        return results.map(c => chatDeDB(c))
    }

    async update(chat){
        return this.model.updateOne({_id: chat.id}, chatADB(chat));
    }
}

export function chatDeDB(chat) {

    const mensajes = chat.mensajes.map(m => {
        const autor = new Usuario(usuarioDeDB(m.autor))
        return new Mensaje(autor, m.contenido, m.fecha, m._id)
    })

    return new Chat({nombre: chat.nombre, mensajes, id: chat._id, descripcion: chat.descripcion})
}

export function chatADB(chat){
    const mensajes = chat.mensajes.map(m => {
        return {
            contenido: m.contenido,
            autor: m.autor.id,
            fecha: m.fecha
        }
    })
    return {
        nombre: chat.nombre,
        mensajes: mensajes,
        _id: chat.id,
    }
}