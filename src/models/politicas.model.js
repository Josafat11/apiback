const mongoose = require('mongoose');

// Definición del esquema para las políticas
const politicaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

// Creación del modelo 'Politica' a partir del esquema
const Politica = mongoose.model('Politica', politicaSchema);

module.exports = Politica;
