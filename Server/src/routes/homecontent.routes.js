import express from 'express'
import { getHomeContent } from '../controllers/homecontent.controller.js'

const homecontentRouter = express.Router()

homecontentRouter.get('/',getHomeContent)

export default homecontentRouter