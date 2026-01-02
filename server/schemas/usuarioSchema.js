import mongoose from 'mongoose';
import {Usuario} from "../model/usuario.js";

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    contrasenia: String,
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: false,
        default: []
    }]
}, {
    timestamps: true
});

usuarioSchema.pre(/^find/, function (next) {
    this.populate("chats");
    next();
})

usuarioSchema.post('save', async function(doc, next) {
    await doc.populate('chats');
    next();
});

usuarioSchema.loadClass(Usuario)

export default mongoose.model('Usuario', usuarioSchema);