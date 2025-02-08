import { Request, Response } from 'express'
import { nanoid } from 'nanoid'
import UrlModel from './urlModel'
import UserModel from '../user/userModel'

export const CreateShortUrl = async (req: any, res: Response) => {
  try {
    const user = req.user
    const urlBody = req.body
    const shortID = nanoid(8)

    if (!urlBody.url) throw new Error('Bad request || URl is required !')

    const url = await UrlModel.create({
      user: user.id,
      shortId: shortID,
      redirectUrl: urlBody.url,
      visitedHistory: [],
    })

    res.status(200).json({ url })
  } catch (error: any) {
    res.status(500).json(error)
  }
}

export const GetShortUrl = async (req: Request, res: Response) => {
  try {
    const { shortId } = req.params
    if (!shortId) throw new Error('Bad Request !')

    const url: any = await UrlModel.findOneAndUpdate(
      {
        shortId,
      },
      { $push: { visitedHistory: { timeStamp: Date.now() } } }
    )

    res.redirect(url.redirectUrl)
  } catch (error: any) {
    res.status(500).json(error)
  }
}

// export const AnalyticsShortUrl = async (req: any, res: any): Promise<any> => {
//   try {
//     const { shortId } = req.params

//     if (!shortId) return res.json('Bad Request !')

//     const url: any = await UrlModel.findOne({
//       shortId,
//     })

//     res.json({
//       totalClick: url.visitedHistory.length,
//       analytics: url.visitedHistory,
//       userId: url.user,
//     })
//   } catch (error: any) {
//     res.status(500).json(error)
//   }
// }

export const AnalyticsShortUrl = async (req: any, res: any): Promise<any> => {
  try {
    const user = req.user

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not found' })
    }

    // Fetch URLs, include createdAt, and sort by createdAt descending (-1)
    const urls = await UrlModel.find({ user: user._id })
      .select('shortId visitedHistory redirectUrl createdAt') // Include createdAt
      .sort({ createdAt: -1 }) // Sort in descending order (latest first)

    if (!urls.length) {
      return res.status(404).json({ message: 'No URLs found for this user' })
    }

    const result = urls.map((url) => ({
      shortId: url.shortId,
      redirectUrl: url.redirectUrl,
      totalClick: url.visitedHistory.length, // Count of visitedHistory entries
      createdAt: url.createdAt, // Include createdAt in response
    }))

    res.json(result)
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}
