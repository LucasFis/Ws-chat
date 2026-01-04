import mongoose from 'mongoose';
import {Usuario} from "../model/usuario.js";

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    contrasenia: String,
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }]
}, {
    timestamps: true
});

usuarioSchema.post('save', function(doc) {
    return doc.populate('chats');
});

export default mongoose.model('Usuario', usuarioSchema);