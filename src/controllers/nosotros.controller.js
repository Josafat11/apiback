const Nosotros = require('../models/nosotros.model');

// Controlador para obtener la información de la sección de Nosotros
exports.getNosotrosInfo = async (req, res) => {
  try {
    const nosotrosInfo = await Nosotros.findOne();
    res.json(nosotrosInfo);
  } catch (error) {
    console.error('Error al obtener la información de Nosotros:', error);
    res.status(500).json({ message: 'Error del servidor al obtener la información de Nosotros' });
  }
};

// Controlador para actualizar la información de la sección de Nosotros
exports.updateNosotrosInfo = async (req, res) => {
  const { resumen, mision, vision } = req.body;
  try {
    let nosotrosInfo = await Nosotros.findOne();
    if (!nosotrosInfo) {
      // Si no hay información existente, creamos un nuevo documento
      nosotrosInfo = new Nosotros({ resumen, mision, vision });
    } else {
      // Si ya existe información, actualizamos los campos
      nosotrosInfo.resumen = resumen;
      nosotrosInfo.mision = mision;
      nosotrosInfo.vision = vision;
    }
    await nosotrosInfo.save();
    res.json({ message: 'Información de Nosotros actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la información de Nosotros:', error);
    res.status(500).json({ message: 'Error del servidor al actualizar la información de Nosotros' });
  }
};
