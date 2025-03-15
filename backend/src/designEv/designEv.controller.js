import { Router } from "express";

const router = Router()

const eventsService = new EventService()

router.post('/', (req, res) => {
    const event = eventsService.createEvent(req.body)
    res.status(201).json(event)
})