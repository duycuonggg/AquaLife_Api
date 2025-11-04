import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE, PHONE_RULE, PHONE_RULE_MESSAGE } from '~/utils/validatiors.js'
import { ObjectId } from 'mongodb'

const EMPLOYEES_COLLECTION_NAME = 'employees'
const EMPLOYEES_COLLECTION_SCHEMA = Joi.object({
  branchesId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  phone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),
  role: Joi.string().valid('admin', 'manager', 'staff').required(),
  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now)
})

const validateBeforeCreate = async (data) => {
  return await EMPLOYEES_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newBranchToAdd = {
      ...validData,
      branchesId: new ObjectId(validData.branchesId)
    }
    const createBranches = await GET_DB().collection(EMPLOYEES_COLLECTION_NAME).insertOne(newBranchToAdd)
    return createBranches
  } catch (error) { throw new Error(error) }
}

export const employeesModel = {
  createNew
}