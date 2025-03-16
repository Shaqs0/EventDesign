import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export class authService {
    async register(user: User) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return prisma.user.create({
            data: { ...user, password: hashedPassword }
        });
    }
    
    async login({ login, password }: { login: string, password: string }) {
        const user = await prisma.user.findUnique({ where: { login } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        return jwt.sign({ userId: user.user_id }, SECRET_KEY, { expiresIn: '1h' });
    }
}
