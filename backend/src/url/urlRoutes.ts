import { Router } from 'express'
import { AnalyticsShortUrl, GetShortUrl, CreateShortUrl } from './urlController'
import { Session } from '../utils/session'
const urlRouter = Router()

urlRouter.post('/', Session, CreateShortUrl)
urlRouter.get('/:shortId', GetShortUrl)
urlRouter.get('/analytics/:shortId', Session, AnalyticsShortUrl)

export default urlRouter
