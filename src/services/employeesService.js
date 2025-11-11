import { employeesModel } from '~/models/employeesModel'
import { hashPassword } from '~/utils/password'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const hashed = await hashPassword(reqBody.password)
    const newEmployees = {
      ...reqBody,
      password: hashed
    }

    const createEmployees = await employeesModel.createNew(newEmployees)
    return createEmployees
  } catch (error) { throw error }
}

const getAll = async () => {
  return await employeesModel.getAll()
}

const getById = async (id) => {
  return await employeesModel.getById(id)
}

const updateById = async (id, data) => {
  return await employeesModel.updateById(id, data)
}

const deleteById = async (id) => {
  return await employeesModel.deleteById(id)
}

const deleteAll = async () => {
  return await employeesModel.deleteAll()
}

export const employeesService = {
  createNew,
  getAll,
  getById,
  updateById,
  deleteById,
  deleteAll
}