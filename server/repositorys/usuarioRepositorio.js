import usuarioModel from "./../schemas/usuarioSchema.js";
import {Usuario} from "../model/usuario.js";
import bcrypt from "bcryptjs";
import {BadInputException} from "../exceptions/badInput.js";
import {NotFoundException} from "../exceptions/NotFound.js";
import {chatADB, chatDeDB} from "./chatRepositorio.js";
import {Chat} from "../model/chat.js";

export class UsuarioRepositorio {
    constructor() {
        this.model = usuarioModel;
    }

    async findAll() {
        const results = await this.model.find()

        return results.map(u => usuarioSimpleDeDB(u));
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

        const usuarioEncontrado = usuarioSimpleDeDB(result)

        if(await bcrypt.compare(contrasenia, usuarioEncontrado.contrasenia)) {
            return usuarioEncontrado
        } else throw new BadInputException("Nombre y/o contraseña incorrectos")
    }

    async update(user) {
        const usuarioDB = await this.model.findById(user.id);
        usuarioDB.chats = user.chats.map(c => c.getId());
        await usuarioDB.save();
    }

    async findById(id) {
        const result = await this.model.findOne({_id:id}).populate("chats");

        if(!result) {
            throw new NotFoundException("No se encontro un usuario con ese id")
        }

        return usuarioDeDB(result)
    }
}

export function usuarioDeDB(user){

    return new Usuario({
        nombre: user.nombre,
        contrasenia: user.contrasenia,
        chats: user.chats.map(c => chatDeDB(c)),
        id: user._id
    })
}

export function usuarioADB(usuario) {
    return {
        _id: usuario.id,
        nombre: usuario.nombre,
        contrasenia: usuario.contrasenia,
        chats: usuario.chats.map(c => c.getId())
    }
}

export function usuarioSimpleDeDB(user) {
    return new Usuario({
        nombre: user.nombre,
        contrasenia: user.contrasenia,
        id: user._id
    })
}