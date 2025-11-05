import { customersModel } from '~/models/customersModel'
import { hashPassword } from '~/utils/password'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const hashed = await hashPassword(reqBody.password)
    const newcustomers = {
      ...reqBody,
      password: hashed
    }

    const createcustomers = await customersModel.createNew(newcustomers)
    return createcustomers
  } catch (error) { throw error }
}

export const customersService = {
  createNew
}