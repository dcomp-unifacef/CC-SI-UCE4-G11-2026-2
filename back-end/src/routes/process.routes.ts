import { Router } from 'express'
import { processController } from '../controllers/process.controller.ts'

const router = Router()

router.post('/', processController.create)
router.get('/', processController.list)
router.get('/:id', processController.getById)
router.put('/:id', processController.update)
router.delete('/:id', processController.remove)

export default router