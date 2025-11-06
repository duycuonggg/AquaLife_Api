import { StatusCodes } from 'http-status-codes'
import { supplierService } from '~/services/supplierService'

const createNew = async (req, res, next) => {
  try {
    const newSupplier = await supplierService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(newSupplier)
  } catch (error) { next(error) }
}

const getAll = async (req, res, next) => {
  try {
    const suppliers = await supplierService.getAll()
    res.status(StatusCodes.OK).json(suppliers)
  } catch (error) { next(error) }
}

export const suppliersController = {
  createNew,
  getAll
}
