import { Router, Request, Response } from 'express';
import { designEvService } from './designEv.service';
import { authMiddleware } from '../auth.middleware';

const router = Router();
const eventsService = new designEvService();

router.post('/', authMiddleware, (req: Request, res: Response) => {
    if (!req.body?.text?.length) {
        res.status(400).json({ message: 'Text is required' });
        return;
    }
    const event = eventsService.createEvent(req.body);
    res.status(201).json(event);
});

export const designEvRouter = router;
