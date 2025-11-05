import { StatusCodes } from 'http-status-codes'
import { ordersService } from '~/services/ordersService'

const createNew = async (req, res, next) => {

  try {
    const createOrders = await ordersService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createOrders)
  } catch (error) { next(error) }
}

export const ordersController = {
  createNew
}
