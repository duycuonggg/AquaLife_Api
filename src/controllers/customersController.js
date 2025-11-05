import { StatusCodes } from 'http-status-codes'
import { customersService } from '~/services/customersService'

const createNew = async (req, res, next) => {

  try {
    const createcustomers = await customersService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createcustomers)
  } catch (error) { next(error) }
}

export const customersController = {
  createNew
}
