import Comment from '../models/comment.model';

// Controlador para crear un nuevo comentario
export const createComment = async (req, res) => {
    try {
        const { name, email, comment } = req.body;
        const newComment = new Comment({ name, email, comment });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al guardar el comentario" });
    }
};

// Controlador para obtener todos los comentarios
export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los comentarios" });
    }
};

// Controlador para obtener un comentario por su ID
export const getCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el comentario" });
    }
};

// Controlador para actualizar un comentario por su ID
export const updateCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el comentario" });
    }
};

// Controlador para eliminar un comentario por su ID
export const deleteCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        await Comment.findByIdAndDelete(commentId);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el comentario" });
    }
};
