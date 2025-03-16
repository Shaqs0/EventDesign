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
        const userData = { user_id: Date.now(), ...validation.data, email: validation.data.email }
        const user = await auth.register(userData);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
});


router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const validation = loginUserDto.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors });
        return;
    }
    
    try {
        const token = await auth.login(validation.data);
        res.status(200).json({ token });
    } catch (err) {
        res.status(401).json({ message: 'Invalid credentials', error: err });
    }
});


export const authRouter = router;