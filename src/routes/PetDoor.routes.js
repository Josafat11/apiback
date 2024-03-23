import { Router } from "express";
import * as petDoorController from "../controllers/PetDoor.controller.js";

const router = Router();

// Rutas para las puertas de mascotas
router.get("/", petDoorController.getAllPetDoors);
router.get("/:petDoorId", petDoorController.getPetDoorById);
router.post("/", petDoorController.createPetDoor);
router.put("/update-data/:petDoorId", petDoorController.updatePetDoorData); // Cambiada la ruta para actualizar datos
router.put("/update-closing-time/:petDoorId", petDoorController.updateClosingTime); // Nueva ruta para actualizar el tiempo de cierre
router.put("/:petDoorId", petDoorController.updatePetDoor);
router.delete("/:petDoorId", petDoorController.deletePetDoor);
// Agrega la nueva ruta para obtener la hora de cierre
router.get("/closing-time/:petDoorId", petDoorController.getClosingTime);

export default router;
