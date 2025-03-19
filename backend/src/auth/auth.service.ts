import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

export class AuthService {
    generateTokens(userId: number) {
        const accessToken = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '2h' });
        const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });

        return { accessToken, refreshToken };
    }

    async register(user: Omit<User, 'user_id'>) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await prisma.user.create({
            data: { ...user, password: hashedPassword }
        });

        return { user: newUser, ...this.generateTokens(newUser.user_id) };
    }

    async login({ login, password }: { login: string, password: string }) {
        const user = await prisma.user.findUnique({ where: { login } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        return { user, ...this.generateTokens(user.user_id) };
    }

    async refreshToken(token: string) {
        try {
            const decoded = jwt.verify(token, REFRESH_SECRET) as { userId: number };
            const user = await prisma.user.findUnique({ where: { user_id: decoded.userId } });

            if (!user) throw new Error('User not found');

            return this.generateTokens(user.user_id);
        } catch (err) {
            throw new Error('Invalid refresh token');
        }
    }
}
