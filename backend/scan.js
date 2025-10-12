const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { imageData } = req.body;
  console.log('Imagen recibida:', imageData);
  res.json({ message: 'Escaneo procesado correctamente' });
});

module.exports = router;
