import { Schema, model } from "mongoose";

const historialSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    danger: {
        type: Boolean,
        required: true
    },
    automaticMode: {
        type: Boolean,
        required: true
    },
    timeOutside: {
        type: Number,
        required: true
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
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Historial', historialSchema);
