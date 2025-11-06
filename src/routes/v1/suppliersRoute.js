import express from 'express'
import { suppliersController } from '~/controllers/suppliersController.js'
import { suppliersValidation } from '~/validations/suppliersValidation.js'
import { verifyToken } from '~/middlewares/authMiddleware.js'
import { authorize } from '~/middlewares/authorizeMiddleware.js'

const Router = express.Router()

Router.route('/')
  .post(verifyToken, authorize(['admin', 'manager']), suppliersValidation.createNew, suppliersController.createNew)
  .get(verifyToken, authorize(['admin', 'manager', 'staff']), suppliersController.getAll)

export const suppliersRouter = Router
