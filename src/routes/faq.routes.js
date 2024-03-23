const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faq.controller');

// Rutas para las preguntas frecuentes
router.get('/', faqController.getAllFaqs);
router.post('/', faqController.createFaq);
router.put('/:id', faqController.updateFaq);
router.delete('/:id', faqController.deleteFaq);

module.exports = router;
