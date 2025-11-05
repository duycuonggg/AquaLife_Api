import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validatiors.js'
import { ObjectId } from 'mongodb'

const ORDERS_COLLECTION_NAME = 'orders'
const ORDERS_COLLECTION_SCHEMA = Joi.object({
  customersId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  branchesId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  totalPrice: Joi.number().min(0).required(),
  status: Joi.string().valid('pending', 'confirmed', 'shipping', 'completed', 'cancelled').required(),
  orderDate: Joi.date().iso().required(),
  deliveryAddress: Joi.string().min(10).max(255).required(),
  note: Joi.string().max(500).allow('').optional(),
  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now)
})

const validateBeforeCreate = async (data) => {
  return await ORDERS_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newOrderToAdd = {
      ...validData,
      customersId: new ObjectId(validData.customersId),
      branchesId: new ObjectId(validData.branchesId)
    }
    const createOrders = await GET_DB().collection(ORDERS_COLLECTION_NAME).insertOne(newOrderToAdd)
    return createOrders
  } catch (error) { throw new Error(error) }
}

export const ordersModel = {
  createNew
}