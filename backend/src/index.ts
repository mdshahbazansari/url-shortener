import * as dotenv from 'dotenv'
dotenv.config()

import * as jwt from 'jsonwebtoken'

import * as mongoose from 'mongoose'
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log('Database connected 😍')
  })
  .catch(() => {
    console.log('Connection failed 😫!')
  })

import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import urlRouter from './url/urlRoutes'
import express, { Request, Response } from 'express'
import { Session } from './utils/session'
import userRouter from './user/userRoutes'
const PORT = 8080
const app = express()
app.listen(PORT, () => {
  console.log(`Server run on PORT : ${PORT} 👈🏻`)
})

app.use(
  cors({
    origin: 'https://url-shortener-frontend-nntg.onrender.com',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
)

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://url-shortener-frontend-nntg.onrender.com'
  )
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Lets start')
})

app.get('/api/session', (req: Request, res: any) => {
  const { accessToken } = req.cookies

  if (!accessToken) {
    return res.status(401).json({ message: 'Unauthorized session!' })
  }

  try {
    const user = jwt.verify(accessToken, process.env.AUTH_SECRET as string)
    res.json(user)
  } catch (err) {
    res.status(401).json({ message: 'Session failed!' })
  }
})

//API's
app.use('/api/user', userRouter)
app.use('/api/url', urlRouter)
