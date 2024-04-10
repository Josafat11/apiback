import { Router } from "express";
import * as petDoorController from "../controllers/PetDoor.controller.js";

const router = Router();
// Agregar la ruta para mostrar todo el historial
router.post("/historial", petDoorController.addToHistorial);
router.get("/historial", petDoorController.getAllHistorial);

export default router;
