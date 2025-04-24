import dotenv from 'dotenv';
dotenv.config();
import express from 'express'; 
const app = express();
app.use(express.json());//Recibe datos json
app.use(express.urlencoded({extended: true}))//Recibe datos dese formularios html

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Inventario sebas cali pruebaaaaa</h1>
    <p>Esto es una aplicación node.js</>
    `);
});
app.get('/users/:id', (req, res) => {
  console.log(req.params);
  const userId = req.params.id;
  res.send(`Información del usuario con el ID: ${userId}`);
});

app.get('/search',(req,res) => {
  const terms = req.query.termino || 'No especificado';
  const category = req.query.categoria || 'todas';

  res.send(`
    <h2>Resultado de la busqueda:</h2>
    <p>Terminos: ${terms}</p>
    <p>Categoria: ${category} </p>
    `)
});

app.post('/form',(req,res) => {
     const name = req.body.nombre || 'Anonimo';
     const email = req.body.email || 'No proporcionado';

     res.json({
      message: 'Datos  recibidos',
      data: {
        name,
        email
      }
     })
}); 

app.post('/api/data',(req,res) => {
  const data = req.body;
  if(!data || Object.keys(data).length ===0){
    return res.status(400).json({error: 'NO se recibieron datos'})
  }
  
  res.status(201).json({
    message:'Datos recibidos',
    data
  })
});

app.listen(PORT, () => {
  console.log(`Corriendo por el puerto  http://localhost:${PORT}`);
});