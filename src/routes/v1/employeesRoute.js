import express from 'express'
import { employeesController } from '~/controllers/employeesController.js'
import { employeesValidation } from '~/validations/employeesValidation.js'
import { verifyToken } from '~/middlewares/authMiddleware.js'
import { authorize } from '~/middlewares/authorizeMiddleware.js'

const Router = express.Router()

Router.route('/')
  .post(verifyToken, authorize('admin'), employeesController.createNew, employeesValidation.createNew)
  .get(verifyToken, authorize(['admin', 'manager']), employeesController.getAll)

Router.route('/:id')
  .get(verifyToken, employeesController.getById)

export const employeesRouter = Router