// src/routes/index.js
import { Router } from 'express';
import authRouter from './auth.js'; // ✅ sin llaves porque es export default

const router = Router();

router.use('/auth', authRouter); 

export default router;
