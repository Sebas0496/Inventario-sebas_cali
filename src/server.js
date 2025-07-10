import app from './app.js';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno
const PORT = process.env.PORT || 3005; 


app.listen(PORT, () => {
    console.log(`Servidor ejecutandose http://localhost:${PORT}`)  
});