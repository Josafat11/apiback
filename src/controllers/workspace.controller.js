import WorkSpace from "../models/workSpace.model";
import { getUserId } from "../middlewares/authJWT";

export const getWorkspacesWithUser = async (req, res) =>{
    try {
        const token = req.headers["x-access-token"];
    
        const user = await getUserId(token);

        const workSpaces = await WorkSpace.find({
            $or: [{propetaryUser: user._id}, {participates: user._id}]
        }).populate({
            path: 'projects',
            model: 'Project'
        });
        
        if(!workSpaces.length) return res.status(400).json({message:"No se encontró registros"}) 

        res.status(200).json(workSpaces);
    } catch (error) {
        res.status(500).json({message:"error interno del servidor"})
    }
}

export const newWorkspace = async( req, res) =>{
    try {
        const {idUser, workSpaceName} = req.body;

        const newWorkSpace = new WorkSpace({
            workSpaceName,
            propetaryUser:idUser
        })

        const workSpaceSaved = await newWorkSpace.save();
        
        return res.status(200).json({message:'ok'});
    } catch (error) {
        res.status(500).json({message:"error interno del servidor"})
    }
}