import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Inventario sebas cali prueba</h1>
    <p>Esto es una aplicación node.js hey</>
    `);
});

app.listen(PORT, () => {
  console.log(`Corriendo por el puerto  http://localhost:${PORT}`);
});