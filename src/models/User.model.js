// models/user.model.js
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'El nombre debe de ser mayor a 3 caracteres']
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, 'Los apellidos deben de ser mayor a 3 caracteres']
    },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingresa un correo electrónico válido'],
    },
    telefono: {
        type: String,
        validate: {
            validator: function (value) {
                return /^\d{10}$/.test(value);
            },
            message: 'El teléfono debe tener exactamente 10 dígitos'
        }
    },
    fechaNacimiento: {
        type: Date,
    },
    user: {
        type: String,
        minLength: [6, 'El usuario debe tener al menos 6 caracteres']
    },
    password: {
        type: String,
        minLength: [8, 'La contraseña debe tener al menos 8 caracteres']
    },
    role: {
        type: String,
        enum: ['admin', 'user'], 
        default: 'user' 
    },
    preguntaSecreta: {
        type: String,
        required: true
    },
    respuestaSecreta: {
        type: String,
        required: true
    },
    recoveryCode: {
        type: String
    },
    door: {
        type: String,
        default: 'ninguno'
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

export default model('User', userSchema);
