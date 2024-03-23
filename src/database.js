const mongoose = require('mongoose');
const dns = require('dns');
const net = require('net');

const atlasURI = 'mongodb+srv://Josafat:FamiliaHD1@cluster0.dnsqacd.mongodb.net/superpet?retryWrites=true&w=majority';
const localURI = 'mongodb://localhost:27017/softionpro';

const connectWithRetry = (uri) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Conexión exitosa a MongoDB'))
    .catch(err => {
      console.error('Error al conectar a la DB:', err);
      dns.resolve('www.google.com', (dnsErr) => {
        if (dnsErr) {
          console.error('Problema de conectividad a internet, reintentando...');
        } else if (!net.isIP('cluster0.dnsqacd.mongodb.net')) {
          console.error('No se puede resolver el DNS de la base de datos, reintentando...');
        } else {
          console.error('Error desconocido, reintentando...');
        }
        setTimeout(() => connectWithRetry(uri), 5000); // Reintenta cada 5 segundos
      });
    });
};

// Comentar o descomentar la línea según el entorno
// connectWithRetry(localURI); // Para desarrollo local
connectWithRetry(atlasURI); // Para entorno de producción

module.exports = mongoose;
