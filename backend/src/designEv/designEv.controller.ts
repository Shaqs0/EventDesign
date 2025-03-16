import { Router, Request, Response } from 'express';
import { designEvService } from './designEv.service';
import { createDesignEvDto } from './designEv.dto';

const router = Router();
const eventsService = new designEvService();

// POST /api/events
router.post("/", async (req: Request, res: Response) => {
  const validation = createDesignEvDto.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ message: validation.error.errors });
    return;
  }

  try {
    const event = await eventsService.createEvent(validation.data);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event', error: err });
  }
});

// GET /api/events
router.get("/", async (req: Request, res: Response) => {
  try {
    const events = await eventsService.getAllEvents();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err });
  }
});

export const designEvRouter = router;
