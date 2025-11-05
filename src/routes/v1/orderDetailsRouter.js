import express from 'express'
import { orderDetailsController } from '../../controllers/orderDetailsController.js'
import { orderDetailsValidation } from '../../validations/orderDetailsValidation.js'

const Router = express.Router()

Router.route('/')
  .post(orderDetailsValidation.createNew, orderDetailsController.createNew)

export const orderDetailsRouter = Router