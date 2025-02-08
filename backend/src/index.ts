import * as dotenv from 'dotenv'
dotenv.config()

import * as jwt from 'jsonwebtoken'

import * as mongoose from 'mongoose';
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

const app = express()
app.listen(process.env.PORT, () => {
  console.log(`Server run on PORT : ${process.env.PORT} 👈🏻`)
})

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

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
