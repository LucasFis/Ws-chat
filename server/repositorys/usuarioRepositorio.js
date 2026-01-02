import usuarioModel from "./../schemas/usuarioSchema.js";
import {Usuario} from "../model/usuario.js";
import bcrypt from "bcryptjs";
import {BadInputException} from "../exceptions/badInput.js";

export class UsuarioRepositorio {
    constructor() {
        this.model = usuarioModel;
    }

    async create(user) {
        const results = await this.model.find({nombre: user.nombre})

        if(results.length > 0) {
            throw new BadInputException("Ya existe un usuario con este nombre")
        }

        user.contrasenia = await bcrypt.hash(user.contrasenia, 10)
        const newUser = new this.model(usuarioADB(user))
        const userGuardado = await newUser.save()

        return usuarioDeDB(userGuardado)
    }

    async findByCredentials(nombre, contrasenia) {
        const result = await this.model.findOne({nombre: nombre})

        if(!result) {
            throw new BadInputException("Nombre y/o contraseña incorrectos")
        }

        const usuarioEncontrado = usuarioDeDB(result)

        if(await bcrypt.compare(contrasenia, usuarioEncontrado.contrasenia)) {
            return usuarioEncontrado
        } else throw new BadInputException("Nombre y/o contraseña incorrectos")
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