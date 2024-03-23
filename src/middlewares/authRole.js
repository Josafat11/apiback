import Workspace from "../models/workSpace.model"
import { getUserId } from "./authJWT";

export const verifyRole = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json({ message: "No token provided" });

        const user = await getUserId(token);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { workspaceid } = req.body;
        if (!workspaceid) return res.status(400).json({ message: "Workspace ID is required" });

        const workspace = await Workspace.findById(workspaceid);
        if (!workspace) return res.status(404).json({ message: "Workspace not found" });

        if (workspace.propetaryUser.toString() !== user._id.toString()) {
            return res.status(400).json({ message: "User is not authorized for this workspace" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}