import { Router } from 'express';
import * as commentController from '../controllers/comment.controller';

const router = Router();

// Ruta para crear un nuevo comentario
router.post('/', commentController.createComment);

// Ruta para obtener todos los comentarios
router.get('/', commentController.getComments);

// Ruta para obtener un comentario por su ID
router.get('/:commentId', commentController.getCommentById);

// Ruta para actualizar un comentario por su ID
router.put('/:commentId', commentController.updateCommentById);

// Ruta para eliminar un comentario por su ID
router.delete('/:commentId', commentController.deleteCommentById);

export default router;
