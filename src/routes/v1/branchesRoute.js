import express from 'express'
import { branchesValidation } from '~/validations/branchesValidation.js'
import { branchesController } from '~/controllers/branchesController.js'

const Router = express.Router()

Router.route('/')
  .post(branchesValidation.createNew, branchesController.createNew)

export const branchesRouter = Router