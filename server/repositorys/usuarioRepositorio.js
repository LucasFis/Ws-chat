import usuarioModel from "./../schemas/usuarioSchema.js";
import {Usuario} from "../model/usuario.js";

export class UsuarioRepositorio {
    constructor() {
        this.model = usuarioModel;
    }

    async create(user) {
        const newUser = new this.model(usuarioADB(user))
        const userGuardado = await newUser.save()

        return usuarioDeDB(userGuardado)
    }

    async findByCredentials(nombre, contrasenia) {
        //codificar contrasenia
        const result = await this.model.findOne({nombre: nombre, contrasenia: contrasenia})

        if(!result) console.log("No results \n")

        return usuarioDeDB(result)
    }
}

export function usuarioDeDB(user){
    user.id = user._id
    return new Usuario(user)
}

export function usuarioADB(usuario) {
    return {
        _id: usuario.id,
        nombre: usuario.nombre,
        contrasenia: usuario.contrasenia,
        chats: usuario.chats.map(c => c.getId())
    }
}