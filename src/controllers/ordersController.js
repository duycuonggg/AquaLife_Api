import { StatusCodes } from 'http-status-codes'
import { ordersService } from '~/services/ordersService'

const createNew = async (req, res, next) => {

  try {
    const createorders = await ordersService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createorders)
  } catch (error) { next(error) }
}

export const ordersController = {
  createNew
}
