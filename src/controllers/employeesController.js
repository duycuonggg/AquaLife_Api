import { StatusCodes } from 'http-status-codes'
import { employeesService } from '~/services/employeesService'

const createNew = async (req, res, next) => {

  try {
    const createemployees = await employeesService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createemployees)
  } catch (error) { next(error) }
}

export const employeesController = {
  createNew
}
