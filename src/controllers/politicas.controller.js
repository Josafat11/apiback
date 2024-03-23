const Politica = require('../models/politicas.model');

// Controlador para crear una nueva política
exports.createPolitica = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const nuevaPolitica = new Politica({ titulo, descripcion });
    const politicaGuardada = await nuevaPolitica.save();
    res.status(201).json(politicaGuardada);
  } catch (error) {
    console.error('Error al crear la política:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Controlador para obtener todas las políticas
exports.getAllPoliticas = async (req, res) => {
  try {
    const politicas = await Politica.find();
    res.status(200).json(politicas);
  } catch (error) {
    console.error('Error al obtener las políticas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Controlador para obtener una política por su ID
exports.getPoliticaById = async (req, res) => {
  try {
    const politica = await Politica.findById(req.params.id);
    if (!politica) {
      return res.status(404).json({ mensaje: 'Política no encontrada' });
    }
    res.status(200).json(politica);
  } catch (error) {
    console.error('Error al obtener la política:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Controlador para actualizar una política por su ID
exports.updatePoliticaById = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const politicaActualizada = await Politica.findByIdAndUpdate(
      req.params.id,
      { titulo, descripcion },
      { new: true }
    );
    if (!politicaActualizada) {
      return res.status(404).json({ mensaje: 'Política no encontrada' });
    }
    res.status(200).json(politicaActualizada);
  } catch (error) {
    console.error('Error al actualizar la política:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Controlador para eliminar una política por su ID
exports.deletePoliticaById = async (req, res) => {
  try {
    const politicaEliminada = await Politica.findByIdAndDelete(req.params.id);
    if (!politicaEliminada) {
      return res.status(404).json({ mensaje: 'Política no encontrada' });
    }
    res.status(200).json({ mensaje: 'Política eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la política:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
