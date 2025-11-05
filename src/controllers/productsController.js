import { StatusCodes } from 'http-status-codes'
import { productsService } from '~/services/productsService'

const createNew = async (req, res, next) => {

  try {
    const createProducts = await productsService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createProducts)
  } catch (error) { next(error) }
}

export const productsController = {
  createNew
}
