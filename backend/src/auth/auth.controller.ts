import { Router, Request, Response } from 'express';
import { createUserDto, loginUserDto } from './user.dto';
import { authService } from './auth.service';

const router = Router();
const auth = new authService();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const validation = createUserDto.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors });
        return;
    }

    try {
        const { user, accessToken, refreshToken } = await auth.register(validation.data);
        res.status(201).json({ user, accessToken, refreshToken });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ message: 'Error registering user', error: errorMessage });
    }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const validation = loginUserDto.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors });
        return;
    }

    try {
        const { user, accessToken, refreshToken } = await auth.login(validation.data);
        res.status(200).json({ user, accessToken, refreshToken });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Invalid credentials';
        res.status(401).json({ message: errorMessage });
    }
});

router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        res.status(400).json({ message: 'Refresh token required' });
        return;
    }

    try {
        const tokens = await auth.refreshToken(refreshToken);
        res.status(200).json(tokens);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Invalid refresh token';
        res.status(401).json({ message: errorMessage });
    }
});

export const authRouter = router;
