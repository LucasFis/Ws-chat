import {Usuario} from "./model/usuario.js";
import {Privacidad} from "./model/privacidad.js";
import {Chat} from "./model/chat.js";
import {Mensaje} from "./model/mensaje.js";

export function chatADTO(chat){
    return {
        id: chat.id,
        nombre: chat.nombre,
        descripcion: chat.descripcion,
        privacidad: chat.privacidad.getNombre(),
        mensajes: chat.mensajes.map(m => mensajeADTO(m))
    }
}

export function chatDeDTO(chat){
    return new Chat({
        id: chat.id, descripcion: chat.descripcion,
        nombre: chat.nombre, privacidad: Privacidad.fromString(chat.privacidad),
        mensajes: chat.mensajes.map(m => mensajeDeDTO(m))
    })
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

export function mensajeDeDTO(mensaje, autor) {
    return new Mensaje({
        autor: autor,
        contenido: mensaje.contenido,
        fecha: mensaje.fecha,
    })
}