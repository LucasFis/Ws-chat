import mongoose from "mongoose";
import {Chat} from "../model/chat.js";

const mensajeSchema = new mongoose.Schema({
    contenido: String,

    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, { _id: true });

const chatSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    mensajes: [mensajeSchema]
});

chatSchema.pre(/^find/, function() {
    this.populate("mensajes.autor");
});

chatSchema.loadClass(Chat)

export default mongoose.model("Chat", chatSchema);