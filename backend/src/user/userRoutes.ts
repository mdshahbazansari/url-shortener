import { NextFunction, Router } from 'express'
import { Login, LogoutUser, Signup } from './userController'
import jwt from 'jsonwebtoken'
const userRouter = Router()

userRouter.post('/signup', Signup)
userRouter.post('/login', Login)
userRouter.get('/logout', LogoutUser)

export default userRouter
