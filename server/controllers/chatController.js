import {usuarioADTO} from "./usuarioController.js";

export class ChatController {
    constructor(chatRepo){
        this.chatRepo = chatRepo
    }

    async findAll(req, res) {
        let results = await this.chatRepo.findAll()

        results = results.map(c => chatADTO(c))

        res.status(200).json(results)
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
