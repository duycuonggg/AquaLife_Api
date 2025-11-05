import express from 'express'
import { customersController } from '~/controllers/customersController.js'
import { customersValidation } from '~/validations/customersValidation.js'

const Router = express.Router()

Router.route('/')
  .post(customersValidation.createNew, customersController.createNew)

export const customersRouter = Router