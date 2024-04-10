import { Schema, model } from "mongoose";

const petDoorSchema = new Schema({
    mac: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: false
    },
    danger: {
        type: Boolean,
        default: false
    },
    automaticMode: {
        type: Boolean,
        default: false
    },
    collars: [{
        identifier: {
            type: String,
            required: true
        }
    }],
    timeOutside: {
        type: Number,
        default: 0
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    closingTime: {
        type: String
    },
    ubicacion: {
        type: Boolean,
        default: false
    },
    temperatura: {
        type: String // Cambiado a String
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('PetDoor', petDoorSchema);
