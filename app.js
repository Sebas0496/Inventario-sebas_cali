/**
 * @file app.js
 * @description
 * API RESTful para la gestión de usuarios utilizando Express.js, Prisma y almacenamiento en archivos JSON.
 * Permite operaciones CRUD sobre usuarios, tanto en archivo local como en base de datos.
 * Incluye validaciones, middlewares personalizados y manejo de errores.  
 * 
 * @module app
 * 
 * @requires dotenv Configuración de variables de entorno.
 * @requires express Framework web para Node.js.
 * @requires @prisma/client ORM para interacción con bases de datos.
 * @requires fs Módulo para manipulación del sistema de archivos.
 * @requires path Módulo para manejo de rutas de archivos.
 * @requires url Utilidad para manejo de URLs.
 * @requires express-validator Validaciones de datos en las rutas.
 * @requires ./validators.js Reglas de validación personalizadas para usuarios.
 * @requires ./middlewares/logger.js Middleware para logging de peticiones.
 * @requires ./middlewares/errorHandler.js Middleware para manejo centralizado de errores.
 * 
 * @constant {string} usersFilePath Ruta absoluta al archivo local de usuarios (users.json).
 * @constant {number} PORT Puerto en el que corre el servidor.
 * 
 * @middleware
 * @function express.json Middleware para parsear JSON en las peticiones.
 * @function express.urlencoded Middleware para parsear datos de formularios HTML.
 * @function LoggerMiddleware Middleware personalizado para registrar logs de las peticiones.
 * @function errorHandler Middleware personalizado para manejo de errores globales.
 * 
 * @route GET /users
 * @description Obtiene la lista de usuarios almacenados en el archivo local.
 * 
 * @route POST /users
 * @description Crea un nuevo usuario en el archivo local. Valida los datos recibidos.
 * 
 * @route PUT /users/:id
 * @description Actualiza un usuario existente en el archivo local por ID. Valida los datos recibidos.
 * 
 * @route DELETE /users/delete/:id
 * @description Elimina un usuario del archivo local por ID.
 * 
 * @route GET /error
 * @description Ruta de prueba para lanzar un error intencional y probar el middleware de errores.
 * 
 * @route GET /db-users
 * @description Obtiene la lista de usuarios almacenados en la base de datos mediante Prisma.
 * 
 * @listen
 * @description Inicia el servidor en el puerto especificado y muestra la URL en consola.
 */
import dotenv from 'dotenv';//nos permite conectar con nuestro archivo .env donde estan 
// las variables de entorno
dotenv.config();
import express from 'express';//Importamos express 
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import fs from 'fs'; // Importamos el módulo fs para trabajar con el sistema de archivos  
import path from 'path';
import { fileURLToPath } from 'url';
import {UserValidationRules, UserValidationEditRules} from './validators.js';
import { validationResult } from 'express-validator';

import {LoggerMiddleware} from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { authenticateToken } from './middlewares/aut.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, 'users.json');


const app = express();
app.use(express.json());//Recibe datos json
app.use(express.urlencoded({ extended: true }))//Recibe datos dese formularios html
app.use(LoggerMiddleware);
app.use(errorHandler);

const PORT = process.env.PORT || 3005;


//Mostrar los usuarios:
app.get('/users',(req,res) => {
  fs.readFile(usersFilePath, 'utf-8', (err,data) => {
    if(err){
      return res.status(500).json({error: 'Error en traer los datos del servidor'});
    }
    const users = JSON.parse(data);
    console.log(users);
    res.json(users);
  });
});
//Crear usuarios:
app.post('/users', UserValidationRules, (req,res) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({errores: error.array()});
  }

  const newUser = req.body;
  // Se eliminó el console.log(newUser) porque no aporta funcionalidad relevante.
  if(!newUser || !newUser.id) {
    return res.status(400).json({error: `No se esta enviando ningun usuario`,
      image:"https://http.cat/400"
    });
  }
  fs.readFile(usersFilePath, 'utf-8',(err, data) => {
    if(err){
      return res.status(500).json({error:'Error con conexión de datos'})
    }
    const users = JSON.parse(data);
    const exist = users.some(user => user.id === newUser.id);
    if(exist == true){
      return res.status(400).json({error:`Ya existe este id en el sistema id: ${newUser.id}`});
    }
    users.push(newUser);
    fs.writeFile(usersFilePath,JSON.stringify(users,null,2), err => {
      if(err){
        return res.json({error: `Error al guardar el usuario`});
      }
      res.status(201).json({message: "usuario creado con exito",
        newUser
      });
    });
    
  });
});
//Actualiar usuarios:
app.put('/users/:id', UserValidationEditRules, (req,res) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({error: error.array()});
  }
  const userId = parseInt(req.params.id, 10);
  const updateUser = req.body;


  fs.readFile(usersFilePath, 'utf-8', (err,data) => {
    if(err){
      return res.status(500).json({error:'Error con conexion de datos'})
    }
    let users = JSON.parse(data);

    const UserExist = users.some(user => user.id === userId);
    if(!UserExist){
      return res.status(404).json({error:`No existe el usuario con el id ${userId}`});
    }

    users = users.map(user => {
      if (user.id === userId) {
        return { ...user, ...updateUser}; // ejemplo
      }
      return user;
    });
    
    fs.writeFile(usersFilePath, JSON.stringify(users,null, 2), (err) => {
      if(err){
        return res.status(500).json({error:'Error al actualizar el usuario'});
      }
      res.json(updateUser);
    });
    
  });
});    
//Eliminar un usuarios:
app.delete('/users/delete/:id', (req,res) => {
  const idUser = parseInt(req.params.id,10);
  fs.readFile(usersFilePath,'utf-8', (err, data) => {
    if(err){
      return res.status(500).json({error:"Error con conexión de datos"});
    }
    let users = JSON.parse(data);
    const userExist = users.some(user => user.id === idUser);
    if(!userExist){
      return res.status(400).json({error:"NO existe el usuario que quieres eliminar"})
    }
    users = users.filter(user => user.id !== idUser);
    fs.writeFile(usersFilePath,JSON.stringify(users, null,2), (err) => {
      if(err){
        return res.status(500).json({error:"Error al eliminar un usuari"});
      }
      res.status(204).send();
    });

  });
});


app.get('/error', (req,res, next) => {
  next(new Error('Error intencional'));
});

app.get('/db-users', async(req,res) => {
  try{  
    const users = await prisma.user.findMany();
    res.json(users);
  }catch(error){
    res.status(500).json({error:'error al comunicarse a la base de datos'});
  }
});

app.get('/protected-route', authenticateToken, (req,res) => {
  res.send('Esta es una ruta protegida');
});

app.post('/register', async(req,res) => {
const {email, password, name} = req.body;
const hashedPassword = await bcrypt.hash(password,10);

const newUser = await prisma.user.create({
  data: {
    email,
    password: hashedPassword,
    name,
    role: 'USER'
  }
});
res.status(201).json({message:'user register success'});
});
  

app.listen(PORT, () => {
  console.log(`Corriendo por el puerto  http://localhost:${PORT}`);
});