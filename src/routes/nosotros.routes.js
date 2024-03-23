import { Router } from 'express';
import * as nosotrosController from '../controllers/nosotros.controller';

const router = Router();

// Ruta para obtener la información de la sección Nosotros
router.get('/', nosotrosController.getNosotrosInfo);

// Ruta para actualizar la información de la sección Nosotros
router.put('/', nosotrosController.updateNosotrosInfo);

export default router;
