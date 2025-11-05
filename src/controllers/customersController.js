import { StatusCodes } from 'http-status-codes'
import { customersService } from '~/services/customersService'

const createNew = async (req, res, next) => {

  try {
    const createCustomers = await customersService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createCustomers)
  } catch (error) { next(error) }
}

export const customersController = {
  createNew
}
