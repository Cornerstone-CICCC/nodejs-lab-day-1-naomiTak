import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import dotenv from 'dotenv'
dotenv.config()

// Create server
const app = express()

// Middleware
app.use(cors({
  origin: 'http://localhost:4321',
  credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser('your-secret-key'));
app.use(cookieSession({
  name: 'session',
  keys: [
    process.env.COOKIE_SIGN_KEY ?? 'jerogiglu90o23',
    process.env.COOKIE_ENCRYPT_KEY ?? 'ejefoiwlejf09qo'
  ],
  maxAge: 60 * 60 * 1000 // 1 hour
}))
//app.use(cookieParser(process.env.COOKIE_SIGN_KEY))

// Routes
import userRouter from './routes/user.routes'
app.use('/api/users', userRouter)

// 404 Fallback
app.use((req: Request, res: Response) => {
  res.status(404).send('Invalid route')
})

// Start server
const PORT: number = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})