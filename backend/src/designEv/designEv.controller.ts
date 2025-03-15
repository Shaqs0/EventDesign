import { Router, Request, Response } from 'express';
import { designEvService } from './designEv.service';
import { authMiddleware } from '../auth.middleware';
import { createDesignEvDto } from './designEv.dto';

const router = Router();
const eventsService = new designEvService();

router.post('/', authMiddleware, (req: Request, res: Response) => {
    const validation = createDesignEvDto.safeParse(req.body)

    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors });
        return;
    }
    const event = eventsService.createEvent(req.body);
    res.status(201).json(event);
});

export const designEvRouter = router;
