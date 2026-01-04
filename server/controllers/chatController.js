import {chatADTO} from "../DTOs.js";

export class ChatController {
    constructor(chatRepo, usuarioRepo){
        this.chatRepo = chatRepo
        this.usuarioRepo = usuarioRepo
    }

    async findAll(req, res, next) {
        try {
            const usuario = await this.usuarioRepo.findById(req.session.user)

            let chats = usuario.chats

            chats = chats.map(c => chatADTO(c))

            res.status(200).json(chats)
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try{
            const usuario = await this.usuarioRepo.findById(req.session.user)
            const {nombre, descripcion, privacidad} = req.body;

            const result = await this.chatRepo.create(nombre, descripcion, privacidad)

            usuario.agregarChat(result)

            this.usuarioRepo.update(usuario)

            res.status(201).json(chatADTO(result))
        } catch (error) {
            next(error);
        }
    }
}


