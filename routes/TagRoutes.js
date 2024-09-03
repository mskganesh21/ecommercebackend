import { GetAllTags, CreateTags } from '../controller/TagsController.js'
import express from 'express'

const router = express.Router()

router.get('/getalltags', GetAllTags)
router.post('/createtags', CreateTags)

export default router
