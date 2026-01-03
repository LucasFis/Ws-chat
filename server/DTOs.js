import {Usuario} from "./model/usuario.js";

export function chatADTO(chat){
    return {
        id: chat.id,
        nombre: chat.nombre,
        descripcion: chat.descripcion,
        mensajes: chat.mensajes.map(m => mensajeADTO(m))
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

export function mensajeADTO(mensaje) {
    return {
        autor: usuarioADTO(mensaje.autor),
        contenido: mensaje.contenido
    }
}