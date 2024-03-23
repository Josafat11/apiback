const mongoose = require('mongoose');

// Definición del esquema para la sección de Nosotros
const nosotrosSchema = new mongoose.Schema({
  resumen: {
    type: String,
    required: true
  },
  mision: {
    type: String,
    required: true
  },
  vision: {
    type: String,
    required: true
  }
});

// Creación del modelo 'Nosotros' a partir del esquema
const Nosotros = mongoose.model('Nosotros', nosotrosSchema);

module.exports = Nosotros;
