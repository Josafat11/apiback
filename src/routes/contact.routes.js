// Ruta para obtener los detalles de contacto
import { Router } from 'express';
import * as contactController from '../controllers/contact.controller';

const router = Router();

router.get('/', contactController.getContactDetails);
router.post('/', contactController.createContacto); // Ruta para crear nuevos detalles de contacto
router.put('/', contactController.updateContactDetails);

router.delete('/', contactController.deleteContacto); // Ruta para eliminar los detalles de contacto existentes

export default router;
