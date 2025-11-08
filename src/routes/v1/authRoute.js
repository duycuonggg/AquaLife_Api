import express from 'express'
import { authController } from '~/controllers/authController'

const Router = express.Router()

Router.route('/login')
  .post(authController.login)

Router.route('/register')
  .post(authController.register)

export const authRoute = Router
