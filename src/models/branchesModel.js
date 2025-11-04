import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { PHONE_RULE, PHONE_RULE_MESSAGE } from '~/utils/validatiors.js'

const BRANCHES_COLLECTION_NAME = 'branches'
const BRANCHES_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  address: Joi.string().min(10).max(255).required(),
  phone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now)
})

const validateBeforeCreate = async (data) => {
  return await BRANCHES_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newBranchToAdd = {
      ...validData
    }
    const createBranches = await GET_DB().collection(BRANCHES_COLLECTION_NAME).insertOne(newBranchToAdd)
    return createBranches
  } catch (error) { throw new Error(error) }
}

export const branchesModel = {
  createNew
}