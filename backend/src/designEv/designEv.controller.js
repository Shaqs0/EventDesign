import { Router } from 'express'
import { designEvService } from './designEv.service.js'
import { authMiddleware } from './auth.middleware.js'

const router = new Router()

const eventsService = new designEvService()

router.post('/', authMiddleware, (req, res) => {
    if (!req.body?.text?.length) {
        return res.status(400).json({ message: 'Text is required' })
    }
    const event = eventsService.createEvent(req.body)
    res.status(201).json(event)
})

export const designEvRouter = router
