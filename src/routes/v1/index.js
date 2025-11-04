import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { branchesRouter } from './branchesRoute.js'
import { employeesRouter } from './employeesRoute.js'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })
})

Router.use('/branches', branchesRouter)
Router.use('/employees', employeesRouter)


export const APIs_V1 = Router

