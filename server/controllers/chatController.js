import {chatADTO} from "../DTOs.js";

export class ChatController {
    constructor(chatRepo, usuarioRepo){
        this.chatRepo = chatRepo
        this.usuarioRepo = usuarioRepo
    }

    async findAll(req, res, next) {
        try {
            const usuario = await this.usuarioRepo.findById(req.session.user);

            let chatsPublicos = await this.chatRepo.findPublic();
            let chatsUsuario = usuario.chats;

            const chatsUnicos = new Map();

            chatsPublicos.forEach(chat => {
                chatsUnicos.set(chat.id.toString(), chat);
            });

            chatsUsuario.forEach(chat => {
                chatsUnicos.set(chat.id.toString(), chat);
            });

            const chats = Array.from(chatsUnicos.values()).map(c => chatADTO(c));

            res.status(200).json(chats);
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


