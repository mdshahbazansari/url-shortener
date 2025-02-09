import { Request, Response } from 'express'
import UserModel from './userModel'
import bcrypt from 'bcrypt'
import mongoose, { Date } from 'mongoose'
import { userInterface } from './userInterface'
import jwt from 'jsonwebtoken'

const oneDay = 23 * 60 * 60 * 1000 // 82800000
const sevenDay = 6 * 24 * 60 * 60 * 1000 // 518400000

const getToken = (user: userInterface) => {
  const payload = {
    id: user._id,
    fullname: user.fullname,
    email: user.email,
  }

  const accessToken = jwt.sign(payload, process.env.AUTH_SECRET as string, {
    expiresIn: '1d',
  })

  const refreshToken = jwt.sign(payload, process.env.AUTH_SECRET as string, {
    expiresIn: '7D',
  })

  return {
    accessToken,
    refreshToken,
  }
}


export const Signup = async (req: Request, res: Response) => {
  try {
    const user = new UserModel(req.body)
    await user.save()
    res.status(200).json({ message: 'Signup success' })
  } catch (err: any) {
    res.status(500).json(err.message)
  }
}

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user: userInterface | null = await UserModel.findOne({ email })

    if (!user) throw new Error('user not found !')

    const validUser = await bcrypt.compare(password, user.password)

    if (!validUser) throw new Error('Incorrect Password !')

    const { accessToken, refreshToken } = getToken(user)

    res.cookie('accessToken', accessToken, {
      maxAge: oneDay,
      domain: process.env.NODE_ENV === 'dev' ? 'localhost' : 'https://url-shortener-frontend-nntg.onrender.com',
      secure: process.env.NODE_ENV === 'dev' ? false : true,
      httpOnly: true,
    })

    res.cookie('refreshToken', refreshToken, {
      maxAge: sevenDay,
      domain: process.env.NODE_ENV === 'dev' ? 'localhost' : 'https://url-shortener-frontend-nntg.onrender.com',
      secure: process.env.NODE_ENV === 'dev' ? false : true,
      httpOnly: true,
    })

    res.status(200).json({ message: 'Login success', userId: user._id })
  } catch (err: any) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

export const LogoutUser = (req: Request, res: Response) => {
  res.cookie('accessToken', null, {
    maxAge: 0,
    domain: process.env.NODE_ENV === 'dev' ? 'localhost' : 'https://url-shortener-frontend-nntg.onrender.com',
    secure: process.env.NODE_ENV === 'dev' ? false : true,
    httpOnly: true,
  })

  res.cookie('refreshToken', null, {
    maxAge: 0,
    domain: process.env.NODE_ENV === 'dev' ? 'localhost' : 'https://url-shortener-frontend-nntg.onrender.com',
    secure: process.env.NODE_ENV === 'dev' ? false : true,
    httpOnly: true,
  })
  console.log('Logout')
  res.json({ message: 'Logout success !' })
}
