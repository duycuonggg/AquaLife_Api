import { StatusCodes } from 'http-status-codes'
import { employeesService } from '~/services/employeesService'
import { employeesModel } from '~/models/employeesModel'

const createNew = async (req, res, next) => {

  try {
    const createEmployees = await employeesService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createEmployees)
  } catch (error) { next(error) }
}

const getAll = async (req, res, next) => {
  try {
    const employees = await employeesService.getAll()
    res.status(StatusCodes.OK).json(employees)
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const employee = await employeesService.getById(req.params.id)
    if (!employee) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Employee not found' })
    }
    res.status(StatusCodes.OK).json(employee)
  } catch (error) {
    next(error)
  }
}

const updateById = async (req, res, next) => {
  try {
    const id = req.params.id
    await employeesService.updateById(id, req.body)
    const updated = await employeesModel.getById(id)
    res.status(StatusCodes.OK).json(updated)
  } catch (error) { next(error) }
}

const deleteById = async (req, res, next) => {
  try {
    const id = req.params.id
    await employeesService.deleteById(id)
    res.status(StatusCodes.NO_CONTENT).end()
  } catch (error) { next(error) }
}

const deleteAll = async (req, res, next) => {
  try {
    const result = await employeesService.deleteAll()
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

export const employeesController = {
  createNew,
  getAll,
  getById,
  updateById,
  deleteById,
  deleteAll
}
