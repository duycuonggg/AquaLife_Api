import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { PHONE_RULE, PHONE_RULE_MESSAGE } from '~/utils/validatiors.js'

const CUSTOMERS_COLLECTION_NAME = 'customers'
const CUSTOMERS_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  phone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),
  address: Joi.string().min(10).max(255).required(),
  password: Joi.string().min(10).max(100).required(),
  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now)
})

const validateBeforeCreate = async (data) => {
  return await CUSTOMERS_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newCustomerToAdd = {
      ...validData
    }
    const createCustomers = await GET_DB().collection(CUSTOMERS_COLLECTION_NAME).insertOne(newCustomerToAdd)
    return createCustomers
  } catch (error) { throw new Error(error) }
}

export const customersModel = {
  createNew
}