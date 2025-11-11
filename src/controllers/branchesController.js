import { StatusCodes } from 'http-status-codes'
import { branchesService } from '~/services/branchesService'

const createNew = async (req, res, next) => {

  try {
    const createBranches = await branchesService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createBranches)
  } catch (error) { next(error) }
}

const getAll = async (req, res, next) => {
  try {
    const items = await branchesService.getAll()
    res.status(StatusCodes.OK).json(items)
  } catch (error) { next(error) }
}

export const branchesController = {
  createNew,
  getAll
}
