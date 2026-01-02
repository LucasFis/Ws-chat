import {Usuario} from "../model/usuario.js";

export class UsuarioController {
    constructor(usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    async findByCredentials(req, res) {
        const {nombre, contrasenia} = req.body

        const usuario = await this.usuarioRepo.findByCredentials(nombre, contrasenia)

        res.status(200).json(usuarioADTO(usuario))
    }
}

export function usuarioADTO(usuario) {
    return {
        nombre: usuario.nombre,
        id: usuario.id
    }
}

export function usuarioDeDTO(usuario) {
    return new Usuario(usuario)
}