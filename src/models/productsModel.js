import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validatiors.js'

const PRODUCTS_COLLECTION_NAME = 'products'
const PRODUCTS_COLLECTION_SCHEMA = Joi.object({
  branchesId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  name: Joi.string().min(3).max(100).required(),
  type: Joi.string().min(2).max(50).required(),
  price: Joi.number().min(1000).precision(0).required(),
  quantity: Joi.number().integer().min(0).required(),
  description: Joi.string().min(10).max(500).required(),
  imageUrl: Joi.string().uri().required(),
  status: Joi.string().valid('available', 'out_of_stock', 'discontinued').required(),
  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now)
})

const validateBeforeCreate = async (data) => {
  return await PRODUCTS_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newProductToAdd = {
      ...validData
    }
    const createProducts = await GET_DB().collection(PRODUCTS_COLLECTION_NAME).insertOne(newProductToAdd)
    return createProducts
  } catch (error) { throw new Error(error) }
}

export const productsModel = {
  createNew
}