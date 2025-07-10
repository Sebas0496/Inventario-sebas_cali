/**
 * @file app.js
 * @description
 * API RESTful para la gestión de usuarios utilizando Express.js, Prisma y almacenamiento en archivos JSON.
 * Permite operaciones CRUD sobre usuarios, tanto en archivo local como en base de datos.
 * Incluye validaciones, middlewares personalizados, autenticación y manejo de errores.
 * 
 * @author Tu Nombre
 * @version 1.0.0
 * 
 * -------------------------
 * DEPENDENCIAS Y MÓDULOS
 * -------------------------
 * dotenv: Carga variables de entorno desde un archivo .env.
 * express: Framework web para Node.js.
 * @prisma/client: ORM para interacción con bases de datos relacionales.
 * fs: Módulo para manipulación del sistema de archivos.
 * path, url: Utilidades para manejo de rutas y archivos.
 * express-validator: Validaciones de datos en las rutas.
 * bcryptjs: Librería para hashear y comparar contraseñas de forma segura.
 * jsonwebtoken: Para autenticación basada en tokens JWT.
 * Middlewares personalizados: Logger, manejo de errores y autenticación.
 */

/* =========================
   IMPORTACIÓN DE MÓDULOS
   ========================= */ 
import dotenv from 'dotenv'; // Carga variables de entorno
dotenv.config();

import express from 'express'; // Framework web principal
import { PrismaClient } from '@prisma/client'; // ORM para bases de datos SQL
const prisma = new PrismaClient(); // Instancia para interactuar con la base de datos

import fs from 'fs'; // Trabajar con archivos locales (users.json)
import path from 'path';
import { fileURLToPath } from 'url';

import { UserValidationRules, UserValidationEditRules } from './src/utils/validators.js'; // Reglas de validación
import { validationResult } from 'express-validator';

import bcrypt from 'bcryptjs'; // Para hashear y comparar contraseñas
import jwt from 'jsonwebtoken'; // Para autenticación JWT

import { LoggerMiddleware } from './src/middlewares/logger.js'; // Middleware de logs
import { errorHandler } from './src/middlewares/errorHandler.js'; // Middleware de errores
import { authenticateToken } from './src/middlewares/aut.js'; // Middleware de autenticación JWT

/* =========================
   DICCIONARIO DE VARIABLES Y FUNCIONES
   =========================
   - dotenv: Carga variables de entorno desde .env.
   - express: Framework web.
   - PrismaClient: ORM para bases de datos SQL.
   - prisma: Instancia de Prisma.
   - fs: Módulo para archivos.
   - path: Manejo de rutas.
   - fileURLToPath: Convierte URL a ruta local.
   - usersFilePath: Ruta absoluta a users.json.
   - app: Instancia de Express.
   - PORT: Puerto del servidor.
   - UserValidationRules/UserValidationEditRules: Reglas de validación.
   - validationResult: Extrae errores de validación.
   - bcrypt: Hasheo y comparación de contraseñas.
   - jwt: Manejo de tokens JWT.
   - LoggerMiddleware: Middleware de logs.
   - errorHandler: Middleware de errores.
   - authenticateToken: Middleware de autenticación JWT.
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, 'users.json');

const app = express();
app.use(express.json()); // Permite recibir datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Permite recibir datos de formularios HTML
app.use(LoggerMiddleware); // Middleware personalizado para logs
app.use(errorHandler); // Middleware global de manejo de errores

const PORT = process.env.PORT || 3005;

/* =========================
   MIDDLEWARES
   =========================
   - express.json(): Parsea JSON en las peticiones.
   - express.urlencoded(): Parsea datos de formularios.
   - LoggerMiddleware: Registra logs de cada petición.
   - errorHandler: Manejo centralizado de errores.
   - authenticateToken: Protege rutas con JWT.
*/

/* =========================
   ENDPOINTS CRUD SOBRE ARCHIVO JSON
   ========================= */

/** 
 * @route GET /
 * @description da una bienvenida a el usuario al ingresar a la aplicación
*/
app.get('/', (req, res) => {
  res.send(`
        <html> 
          <head>
        <title>Mi API</title>
      </head>
      <body>
        <h1>Bienvenidos!!</h1>
        <p>API de creación de usuarios</P>
      </body>
        </html>
      `);
});

/**
 * @route GET /users
 * @description Obtiene la lista de usuarios almacenados en el archivo local users.json.
 */
app.get('/users', (req, res) => {
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error en traer los datos del servidor' });
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

/**
 * @route POST /users
 * @description Crea un nuevo usuario en el archivo local. Valida los datos recibidos.
 */
app.post('/users', UserValidationRules, (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errores: error.array() });
  }

  const newUser = req.body;
  if (!newUser || !newUser.id) {
    return res.status(400).json({
      error: `No se esta enviando ningun usuario`,
      image: "https://http.cat/400"
    });
  }
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error con conexión de datos' });
    }
    const users = JSON.parse(data);
    const exist = users.some(user => user.id === newUser.id);
    if (exist) {
      return res.status(400).json({ error: `Ya existe este id en el sistema id: ${newUser.id}` });
    }
    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) {
        return res.json({ error: `Error al guardar el usuario` });
      }
      res.status(201).json({
        message: "usuario creado con exito",
        newUser
      });
    });
  });
});

/**
 * @route PUT /users/:id
 * @description Actualiza un usuario existente en el archivo local por ID. Valida los datos recibidos.
 */
app.put('/users/:id', UserValidationEditRules, (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const userId = parseInt(req.params.id, 10);
  const updateUser = req.body;

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error con conexion de datos' });
    }
    let users = JSON.parse(data);

    const UserExist = users.some(user => user.id === userId);
    if (!UserExist) {
      return res.status(404).json({ error: `No existe el usuario con el id ${userId}` });
    }

    users = users.map(user => user.id === userId ? { ...user, ...updateUser } : user);

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar el usuario' });
      }
      res.json(updateUser);
    });
  });
});

/**
 * @route DELETE /users/delete/:id
 * @description Elimina un usuario del archivo local por ID.
 */
app.delete('/users/delete/:id', (req, res) => {
  const idUser = parseInt(req.params.id, 10);
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error con conexión de datos" });
    }
    let users = JSON.parse(data);
    const userExist = users.some(user => user.id === idUser);
    if (!userExist) {
      return res.status(400).json({ error: "NO existe el usuario que quieres eliminar" });
    }
    users = users.filter(user => user.id !== idUser);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al eliminar un usuario" });
      }
      res.status(204).send();
    });
  });
});

/* =========================
   ENDPOINTS DE BASE DE DATOS (PRISMA)
   ========================= */

/**
 * @route GET /db-users
 * @description Obtiene la lista de usuarios almacenados en la base de datos mediante Prisma.
 * 
 * PrismaClient.findMany():
 * - Método de Prisma para obtener todos los registros de una tabla.
 * - Devuelve un array de objetos usuario.
 */
app.get('/db-users', async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Devuelve todos los usuarios de la tabla user
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'error al comunicarse a la base de datos' });
  }
});

/* =========================
   AUTENTICACIÓN Y REGISTRO
   ========================= */

/**
 * @route POST /register
 * @description Registra un nuevo usuario en la base de datos. Hashea la contraseña antes de guardar.
 * 
 * bcrypt.hash(password, saltRounds):
 * - Hashea la contraseña de forma segura.
 * - El resultado es un string cifrado que se almacena en la base de datos.
 */
app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña con 10 rondas de sal
  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER'
      }
    });
    res.status(201).json({ message: 'user register success' });
  } catch {
    res.json({ message: 'Error' });
  }
});

/**
 * @route POST /login
 * @description Autentica un usuario por email y contraseña.
 * 
 * PrismaClient.findUnique({ where: { email } }):
 * - Busca un usuario único por el campo email (debe ser unique en el modelo Prisma).
 * 
 * bcrypt.compare(password, user.password):
 * - Compara la contraseña enviada con el hash almacenado en la base de datos.
 * - Devuelve true si coinciden, false si no.
 */
app.post('/login', async (req, res) => {  
  const { email, password } = req.body;
  // Busca el usuario por email (findUnique requiere que el campo tenga una propiedad anica en el modelo)
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: 'Correo invalido o contraseña' });

  // Compara la contraseña enviada con el hash almacenado
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'Correo invalido o contraseña' });

  const token = jwt.sign({
    id: user.id,
    role: user.role
  }, process.env.JWT_SECRET, { expiresIn: '4h' });

  res.json({ token });
});

/* =========================
   RUTAS DE PRUEBA Y PROTEGIDAS
   ========================= */

/**
 * @route GET /error
 * @description Ruta de prueba para lanzar un error intencional y probar el middleware de errores.
 */
app.get('/error', (req, res, next) => {
  next(new Error('Error intencional'));
});

/**
 * @route GET /protected-route
 * @description Ruta protegida que requiere autenticación mediante JWT.
 * 
 * authenticateToken:
 * - Middleware que verifica la validez del token JWT enviado en la cabecera Authorization.
 */
app.get('/protected-route', authenticateToken, (req, res) => {
  res.send('Esta es una ruta protegida bienvenido!!');

});

/* =========================
   INICIAR EL SERVIDOR
   ========================= */

/**
 * @listen
 * @description Inicia el servidor en el puerto especificado y muestra la URL en consola.
 */
app.listen(PORT, () => {
  console.log(`Corriendo por el puerto  http://localhost:${PORT}`);
});

/* =========================
   EXPLICACIÓN DE FUNCIONES CLAVE
   =========================

   Prisma:
   - findUnique: Busca un único registro en la base de datos que coincida con el criterio dado (por ejemplo, un email).
     Ejemplo: const user = await prisma.user.findUnique({ where: { email } });
     Solo funciona correctamente si el campo es único en el modelo Prisma.

   - findMany: Devuelve todos los registros de una tabla.
     Ejemplo: const users = await prisma.user.findMany();

   - create: Crea un nuevo registro en la tabla user.
     Ejemplo: await prisma.user.create({ data: { ... } });

   bcryptjs:
   - hash: Hashea una contraseña en texto plano para almacenarla de forma segura.
     Ejemplo: const hashedPassword = await bcrypt.hash(password, 10);

   - compare: Compara una contraseña en texto plano con un hash almacenado.
     Ejemplo: const validPassword = await bcrypt.compare(password, user.password);

   Middlewares personalizados:
   - LoggerMiddleware: Registra información sobre cada petición recibida.
   - errorHandler: Captura errores lanzados en cualquier parte de la aplicación y responde con un mensaje y código de estado apropiado.
   - authenticateToken: Verifica que la petición incluya un token JWT válido en la cabecera Authorization.

   Buenas prácticas:
   - No revelar si el error es por email o contraseña en el login, para mayor seguridad.
   - Hashear siempre las contraseñas antes de almacenarlas.
   - Validar todos los datos de entrada con express-validator.
   - Centralizar el manejo de errores con un middleware.
   - Proteger rutas sensibles con*/


