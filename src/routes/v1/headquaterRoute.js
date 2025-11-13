import express from 'express'
import { headquaterController } from '~/controllers/headquaterController.js'
import { headquaterValidation } from '~/validations/headquaterValidation.js'

const Router = express.Router()

Router.route('/')
  .post(headquaterValidation.createNew, headquaterController.createNew)

export const headquaterRouter = Router