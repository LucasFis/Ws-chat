import {usuarioADTO, usuarioDeDTO} from "../DTOs.js";

export class UsuarioController {
    constructor(usuarioRepo, chatRepo) {
        this.usuarioRepo = usuarioRepo;
        this.chatRepo = chatRepo;
    }

    async agregarChat(req, res, next) {
        try {
            const id = req.params.id;
            const {chatId} = req.body;

            const usuario = await this.usuarioRepo.findById(id);

            const chat = await this.chatRepo.findById(chatId);

            usuario.agregarChat(chat)

            await this.usuarioRepo.update(usuario)

            res.status(202).json(usuario)
        } catch (error) {
            next(error);
        }

    }

    async findAll(req, res, next) {
        try{
            const results = await this.usuarioRepo.findAll();

            res.status(200).json(results.map(u => usuarioADTO(u)));

        } catch(error) {
            next(error);
        }
    }

    async register(req, res, next) {
        try {
            const usuario = req.body;
            const newUsuario = await this.usuarioRepo.create(usuarioDeDTO(usuario));

            req.session.user = newUsuario.id;

            res.status(201).json(usuarioADTO(newUsuario));
        } catch (error) {
            next(error);
        }
    }

    async findByCredentials(req, res, next) {
        try{
            const {nombre, contrasenia} = req.body

            const usuario = await this.usuarioRepo.findByCredentials(nombre, contrasenia)

            req.session.user = usuario.id;

            res.status(200).json(usuarioADTO(usuario))
        } catch (error) {
            next(error);
        }
    }
}

