// controllers/faqController.js

const Faq = require('../models/faq.model');

// Obtener todas las preguntas frecuentes
exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (error) {
    console.error('Error al obtener las preguntas frecuentes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear una nueva pregunta frecuente
exports.createFaq = async (req, res) => {
  try {
    const { pregunta, respuesta } = req.body;
    const nuevaFaq = new Faq({ pregunta, respuesta });
    await nuevaFaq.save();
    res.status(201).json(nuevaFaq);
  } catch (error) {
    console.error('Error al crear una nueva pregunta frecuente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar una pregunta frecuente existente
exports.updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { pregunta, respuesta } = req.body;
    const faqActualizada = await Faq.findByIdAndUpdate(id, { pregunta, respuesta }, { new: true });
    if (!faqActualizada) {
      return res.status(404).json({ error: 'Pregunta frecuente no encontrada' });
    }
    res.json(faqActualizada);
  } catch (error) {
    console.error('Error al actualizar la pregunta frecuente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar una pregunta frecuente existente
exports.deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const faqEliminada = await Faq.findByIdAndDelete(id);
    if (!faqEliminada) {
      return res.status(404).json({ error: 'Pregunta frecuente no encontrada' });
    }
    res.json({ message: 'Pregunta frecuente eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la pregunta frecuente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
