const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const scanRoute = require('./scan');
app.use('/api/scan', scanRoute);

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});