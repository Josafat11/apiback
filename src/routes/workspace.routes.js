import { Router } from "express";
import * as jws from "../middlewares/authJWT"
import * as WorkspaceController from "../controllers/workspace.controller"
const router = Router();

router.get('/',jws.verifyToken,WorkspaceController.getWorkspacesWithUser)
router.post('/',jws.verifyToken,WorkspaceController.newWorkspace)

export default router;