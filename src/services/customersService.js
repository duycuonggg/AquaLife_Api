import { customersModel } from '~/models/customersModel'
import { hashPassword } from '~/utils/password'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const hashed = await hashPassword(reqBody.password)
    const newCustomers = {
      ...reqBody,
      password: hashed
    }

    const createCustomers = await customersModel.createNew(newCustomers)
    return createCustomers
  } catch (error) { throw error }
}

export const customersService = {
  createNew
}