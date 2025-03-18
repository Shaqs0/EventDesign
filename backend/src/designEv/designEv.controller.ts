import { Router, RequestHandler } from "express";
import { designEvService } from "./designEv.service";
import { createCategoryDto, createDesignEvDto } from "./designEv.dto";

const router = Router();
const eventsService = new designEvService();

const createEvent: RequestHandler = async (req, res) => {
  const validation = createDesignEvDto.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ message: validation.error.errors });
    return;
  }

  try {
    const event = await eventsService.createEvent(validation.data);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err });
  }
};

const getReportByPeriod: RequestHandler = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    res.status(400).json({ message: "Start date and end date are required" });
    return; 
  }

  try {
    const events = await eventsService.getEventsByPeriod(startDate as string, endDate as string);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Error generating report", error: err });
  }
};

const updateEventFavorite: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== 'boolean') {
    res.status(400).json({ message: "'favorite' must be a boolean value" });
    return;
  }

  try {
    const event = await eventsService.updateEventFavoriteStatus(parseInt(id), favorite);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: "Error updating event favorite status", error: err });
  }
};

const getReportByCategory: RequestHandler = async (req, res) => {
  const { categoryName } = req.query;

  if (!categoryName) {
    res.status(400).json({ message: "Category name is required" });
    return;
  }

  try {
    const events = await eventsService.getEventsByCategory(categoryName as string);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Error generating report", error: err });
  }
};

const createCategory: RequestHandler = async (req, res) => {
  const validation = createCategoryDto.safeParse(req.body); 

  if (!validation.success) {
    res.status(400).json({ message: validation.error.errors });
    return;
  }

  try {
    const existingCategory = await eventsService.getCategoryByName(validation.data.name);
    if (existingCategory) {
      res.status(409).json({ message: "Category already exists" });
      return;
    }

    const category = await eventsService.createCategory(validation.data.name);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Error creating category", error: err });
  }
};

const getCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await eventsService.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error getting categories", error: err });
  }
};

const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const validation = createDesignEvDto.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ message: validation.error.errors });
    return;
  }

  try {
    const event = await eventsService.updateEvent(parseInt(id), validation.data);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: "Error updating event", error: err });
  }
};

const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await eventsService.deleteEvent(parseInt(id));
    if (!deletedEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event", error: err });
  }
};

const getAllEvents: RequestHandler = async (req, res) => {
  try {
    const events = await eventsService.getAllEvents();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err });
  }
};

router.post("/categories", createCategory);
router.get("/categories", getCategories);

router.get("/reports/by-period", getReportByPeriod);
router.get("/reports/by-category", getReportByCategory);

router.put("/:id/favorite", updateEventFavorite);  

router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.get("/", getAllEvents);

export const designEvRouter = router;
