import { Schema, model } from "mongoose";


const userSchema = new Schema({
    workSpaceName: {
        type: String,
        required: true,
    },
    propetaryUser:{
        type: String,
        required:true
    },
    projects:[{
        type: Schema.Types.ObjectId,
        ref:'projects'
    }],
    participates:[{
        type: Schema.Types.ObjectId,
        ref:'users'
    }]
},{
    timestamps: true,
    versionKey: false
});


export default model('WorkSpace',userSchema);