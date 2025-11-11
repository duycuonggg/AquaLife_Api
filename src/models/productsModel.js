import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validatiors.js'
import { ObjectId } from 'mongodb'

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

const getAll = async () => {
  try {
    const items = await GET_DB().collection(PRODUCTS_COLLECTION_NAME).find({}).toArray()
    return items
  } catch (error) { throw new Error(error) }
}

const findById = async (id) => {
  try {
    const item = await GET_DB().collection(PRODUCTS_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    return item
  } catch (error) { throw new Error(error) }
}

const updateById = async (id, data) => {
  try {
    const update = { $set: { ...data, updatedAt: Date.now() } }
    const result = await GET_DB().collection(PRODUCTS_COLLECTION_NAME).updateOne({ _id: new ObjectId(id) }, update)
    return result
  } catch (error) { throw new Error(error) }
}

const deleteById = async (id) => {
  try {
    const result = await GET_DB().collection(PRODUCTS_COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) })
    return result
  } catch (error) { throw new Error(error) }
}

const deleteAll = async () => {
  try {
    const result = await GET_DB().collection(PRODUCTS_COLLECTION_NAME).deleteMany({})
    return result
  } catch (error) { throw new Error(error) }
}

export const productsModel = {
  createNew,
  getAll,
  findById,
  updateById,
  deleteById,
  deleteAll
}