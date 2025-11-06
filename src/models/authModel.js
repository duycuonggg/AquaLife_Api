import { GET_DB } from '~/config/mongodb'

const EMPLOYEES_COLLECTION_NAME = 'employees'

const findByEmail = async (email) => {
  try {
    const employees = await GET_DB().collection(EMPLOYEES_COLLECTION_NAME).findOne({ email })
    return employees
  } catch (error) { throw new Error(error) }
}

export const authModel = {
  findByEmail
}
