/**
 * Middleware para autenticar tokens JWT en las solicitudes HTTP.
 *
 * Extrae el token JWT del encabezado 'Authorization', lo verifica usando la clave secreta
 * definida en la variable de entorno JWT_SECRET y, si es válido, agrega la información del usuario
 * decodificada al objeto de solicitud (req.user). Si el token no está presente o es inválido,
 * responde con un error 401 (Acceso denegado) o 403 (Token inválido).
 *
 * @function authenticateToken
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @param {import('express').NextFunction} next - Función para pasar el control al siguiente middleware.
 * @returns {void}
 */
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {  
  const token = req.header('Authorization')?.split(" ")[1];
  /* encadenamiento opcional "?" verifica que lo que este antes de este signo no sea null ni undefined
  si el header existe  hace el split que es una función que crea un arreglo en este caso cuando encuentra un espacio 
  por que es lo que le estamos indicando y luego nos unbica en la pocición 1 de ese arreglo
  */   
  if (!token) {
    
    return res.status(401).json({ error: "Acceso denegado, token invalido" }); 
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    
    req.user = user; // Esto debe estar dentro del callback
    next();
  });
};
