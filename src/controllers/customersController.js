import { StatusCodes } from 'http-status-codes'
import { customersService } from '~/services/customersService'

const createNew = async (req, res, next) => {

  try {
    const createCustomers = await customersService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createCustomers)
  } catch (error) { next(error) }
}

const getAll = async (req, res, next) => {
  try {
    const items = await customersService.getAll()
    res.status(StatusCodes.OK).json(items)
  } catch (error) { next(error) }
}

const updateById = async (req, res, next) => {
  try {
    const result = await customersService.updateById(req.params.id, req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

const deleteById = async (req, res, next) => {
  try {
    const result = await customersService.deleteById(req.params.id)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

const deleteAll = async (req, res, next) => {
  try {
    const result = await customersService.deleteAll()
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

export const customersController = {
  createNew
  , getAll
  , updateById
  , deleteById
  , deleteAll
}
