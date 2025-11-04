import express from 'express'
import { employeesController } from '~/controllers/employeesController.js'
import { employeesValidation } from '~/validations/employeesValidation.js'

const Router = express.Router()

Router.route('/')
  .post(employeesValidation.createNew, employeesController.createNew)

export const employeesRouter = Router