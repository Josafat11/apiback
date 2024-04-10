import { Router } from "express";
import * as petDoorController from "../controllers/PetDoor.controller.js";

const router = Router();

// Rutas para las puertas de mascotas
router.get("/", petDoorController.getAllPetDoors);
router.get("/:petDoorId", petDoorController.getPetDoorById);
router.post("/", petDoorController.createPetDoor);
router.put("/update-data/:petDoorId", petDoorController.updatePetDoorData);
router.put("/update-closing-time/:petDoorId", petDoorController.updateClosingTime);
router.put("/:petDoorId", petDoorController.updatePetDoor);
router.delete("/:petDoorId", petDoorController.deletePetDoor);
router.get("/closing-time/:petDoorId", petDoorController.getClosingTime);
router.put("/update-state/:petDoorId", petDoorController.updatePetDoorState);


export default router;
