import bcrypt, { hash } from 'bcryptjs'; // Para hashear y comparar contraseñas
import jwt from 'jsonwebtoken'; // Para autenticación JWT
import { PrismaClient } from '@prisma/client'; // ORM para bases de datos SQL
const prisma = new PrismaClient();

export const registerUser = async (email, password, name) => {  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: { email, password: hashedPassword, name, role: 'USER' } 
    });
    return newUser;
}

export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('correo invalido o contraseña');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('correo invalido o contraseña');
    }

    const token = jwt.sign({
        id: user.id,
        role: user.role
    }, process.env.JWT_SECRET,
        { expiresIn: '4h' }
    );
    return token;
};

