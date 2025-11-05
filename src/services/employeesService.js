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

export const employeesService = {
  createNew
}