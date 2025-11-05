import { StatusCodes } from 'http-status-codes'
import { orderDetailsService } from '~/services/orderDetailsService'

const createNew = async (req, res, next) => {

  try {
    const createOrderDetails = await orderDetailsService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createOrderDetails)
  } catch (error) { next(error) }
}

export const orderDetailsController = {
  createNew
}
