import express from 'express'
import { productsController } from '~/controllers/productsController.js'
import { productsValidation } from '~/validations/productsValidation.js'

const Router = express.Router()

Router.route('/')
  .post(productsValidation.createNew, productsController.createNew)

export const productsRouter = Router