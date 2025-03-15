import express, { NextFunction, Request, Response } from 'express'
import { designEvRouter } from './src/designEv/designEv.controller'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

async function main() {
    app.use(express.json())
    
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Что-то пошло не так...')
    })

    app.use('/api/events', designEvRouter)

    app.all('*', (req: Request, res: Response) => {
        res.status(404).json({ message: 'Not Found' })
    })

    app.listen(process.env.PORT || 4200, () => {
        console.log('Server is running on port 4200')
    })
}

main()
