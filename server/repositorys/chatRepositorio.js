import chatModel from "./../schemas/chatSchema.js"
import {Chat} from "../model/chat.js";
import {Mensaje} from "../model/mensaje.js";
import {Usuario} from "../model/usuario.js";
import {usuarioDeDB, usuarioSimpleDeDB} from "./usuarioRepositorio.js"
import {NotFoundException} from "../exceptions/NotFound.js";
import {Privacidad} from "../model/privacidad.js";

export class ChatRepositorio {
    constructor() {
        this.model = chatModel
    }

    async findPublic() {
        const results = await this.model.find({privacidad: "PUBLICO"})
        return results.map(c => chatDeDB(c))
    }

    async create(nombre, descripcion, privacidad) {
        const newChat = new this.model({nombre, descripcion, privacidad, mensajes: []})
        const nuevoChat = await newChat.save()
        return chatDeDB(nuevoChat)
    }

    async findById(id) {
        const result = await this.model.findOne({_id: id})

        if (!result) {
            throw new NotFoundException("El chat ingresado no existe")
        }
        return chatDeDB(result)
    }

    async updateMessages(chat){
        const chatDB = await this.model.findById(chat.id)
        chatDB.mensajes = chat.mensajes.map(m=> mensajesADB(m))
        await chatDB.save();
    }
}

export function chatDeDB(chat) {

    const mensajes = chat.mensajes.map(m => mensajeDeDB(m))

    return new Chat({
        nombre: chat.nombre, mensajes, id: chat._id,
        descripcion: chat.descripcion, privacidad: Privacidad.fromString(chat.privacidad)
    })
}

export function chatADB(chat){
    const mensajes = chat.mensajes.map(m => mensajesADB(m))

    return {
        nombre: chat.nombre,
        mensajes: mensajes,
        _id: chat.id,
        privacidad: chat.privacidad.getNombre()
    }
}

export function mensajeDeDB(mensajeDB) {
    const autor = usuarioSimpleDeDB(mensajeDB.autor)
    return new Mensaje({
        autor, contenido: mensajeDB.contenido,
        fecha: mensajeDB.fecha
    })
}

export function mensajesADB(mensaje){
    return {
        contenido: mensaje.contenido,
        autor: mensaje.autor.id,
        fecha: mensaje.fecha
    }
}