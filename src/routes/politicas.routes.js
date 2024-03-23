import { Router } from "express";
import * as politicasController from "../controllers/politicas.controller";

const router = Router();

router.get('/', politicasController.getAllPoliticas);
router.post('/', politicasController.createPolitica);
router.get('/:id', politicasController.getPoliticaById);
router.put('/:id', politicasController.updatePoliticaById);
router.delete('/:id', politicasController.deletePoliticaById);

export default router;
