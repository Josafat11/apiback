import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});

export default model('Comment', commentSchema);
