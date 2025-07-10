import express from 'express';
import routes from './routes/index.js'; 

const app = express();  
app.use(express.json()); // Permite recibir datos en formato JSON

app.use('/api', routes);

app.get('/', (req,res) => {
    res.send('Hola mundo'); 
});

export default app;  