import {Router} from 'express'; 
import {register, login} from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/aut.js';


const router = Router(); 

router.post('/register', register);   
router.post('/login', login);   

router.get('/protected-route', authenticateToken, (req, res) => {
  res.send('Esta es una ruta protegida bienvenido!!'); 

}); 

export default router;