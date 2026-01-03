import {usuarioADTO, usuarioDeDTO} from "../DTOs.js";

export class UsuarioController {
    constructor(usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
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

