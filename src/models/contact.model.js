import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    direccion: {
        type: String,
        required: true
    },
    correoElectronico: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});

export default model('Contacto', contactSchema);
