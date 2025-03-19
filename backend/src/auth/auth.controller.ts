import { Router, Request, Response } from 'express';
import { createUserDto, loginUserDto } from './user.dto';
import { AuthService } from './auth.service';

const router = Router();
const auth = new AuthService();

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as 'strict', 
};


router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const validation = createUserDto.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors });
        return;
    }

    try {
        const { user, accessToken, refreshToken } = await auth.register(validation.data);

        res.cookie('userId', user.user_id, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: false });

        res.cookie('accessToken', accessToken, { ...COOKIE_OPTIONS, maxAge: 2 * 60 * 60 * 1000, httpOnly: false  }); // 2 часа
        res.cookie('refreshToken', refreshToken, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: false  }); // 7 дней

        res.status(201).json({ user });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Error registering user', error: err.message });
        } else {
            res.status(500).json({ message: 'Error registering user', error: 'Unknown error' });
        }        
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

        res.cookie('userId', user.user_id, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: false });

        res.cookie('accessToken', accessToken, { ...COOKIE_OPTIONS, maxAge: 2 * 60 * 60 * 1000, httpOnly: false  });
        res.cookie('refreshToken', refreshToken, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: false  });

        res.status(200).json({ user });
    } catch (err) {
        if (err instanceof Error) {
            res.status(401).json({ message: 'Error registering user', error: err.message });
        } else {
            res.status(401).json({ message: 'Error registering user', error: 'Unknown error' });
        }
        
    }
});

router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(400).json({ message: 'Refresh token required' });
        return;
    }

    try {
        const tokens = await auth.refreshToken(refreshToken);


        res.cookie('accessToken', tokens.accessToken, { ...COOKIE_OPTIONS, maxAge: 2 * 60 * 60 * 1000 });
        res.cookie('refreshToken', tokens.refreshToken, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.status(200).json({ message: 'Tokens refreshed' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(401).json({ message: 'Error registering user', error: err.message });
        } else {
            res.status(401).json({ message: 'Error registering user', error: 'Unknown error' });
        }
        
    }
});

router.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('accessToken', COOKIE_OPTIONS);
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
    res.status(200).json({ message: 'Logged out successfully' });
});

export const authRouter = router;
