// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Ruta GET de prueba
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

module.exports = router;
