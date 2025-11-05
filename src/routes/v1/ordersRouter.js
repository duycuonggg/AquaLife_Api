import express from 'express'
import { ordersController } from '~/controllers/ordersController.js'
import { ordersValidation } from '~/validations/ordersValidation.js'

const Router = express.Router()

Router.route('/')
  .post(ordersValidation.createNew, ordersController.createNew)

export const ordersRouter = Router