import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../user/userModel'

// export const Session = async (req: any, res: Response, next: NextFunction) => {
//   try {
//     const { accessToken } = req.cookies

//     if (!accessToken) throw new Error('Unauthorize session !')

//     const user = jwt.verify(accessToken, process.env.AUTH_SECRET as string)
//     req.user = user
//     next()
//   } catch (err: any) {
//     res.status(500).json({ message: 'Session failed !' })
//   }
// }

export const Session = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { accessToken } = req.cookies

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No session token found' })
    }

    const decoded: any = jwt.verify(
      accessToken,
      process.env.AUTH_SECRET as string
    )

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' })
    }

    const user = await UserModel.findById(decoded.id).select('-password')
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' })
    }

    req.user = user 
    next()
  } catch (error: any) {
    return res.status(401).json({
      message: 'Unauthorized: Session validation failed',
      error: error.message,
    })
  }
}
