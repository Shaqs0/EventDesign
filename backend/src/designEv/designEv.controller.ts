import { Router, Request, Response, RequestHandler } from 'express';
import { designEvService } from './designEv.service';
import { createDesignEvDto } from './designEv.dto';

const router = Router();
const eventsService = new designEvService();

const createEvent: RequestHandler = async (req: Request, res: Response): Promise<void> => {
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
};

const updateEvent: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const validation = createDesignEvDto.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ message: validation.error.errors });
    return;
  }

  try {
    const event = await eventsService.updateEvent(parseInt(id), validation.data);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err });
  }
};

const deleteEvent: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedEvent = await eventsService.deleteEvent(parseInt(id));
    if (!deletedEvent) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err });
  }
};

const getAllEvents: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await eventsService.getAllEvents();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err });
  }
};

router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.get("/", getAllEvents);

export const designEvRouter = router;
