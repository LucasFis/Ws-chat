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

usuarioSchema.pre(/^find/, function () {
    this.populate("chats");
})

usuarioSchema.post('save', function(doc) {
    return doc.populate('chats');
});

usuarioSchema.loadClass(Usuario)

export default mongoose.model('Usuario', usuarioSchema);