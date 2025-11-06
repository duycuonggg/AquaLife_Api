import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE, PHONE_RULE, PHONE_RULE_MESSAGE } from '~/utils/validatiors.js'
import { ObjectId } from 'mongodb'

const SUPPLIERS_COLLECTION_NAME = 'suppliers'

const SUPPLIERS_COLLECTION_SCHEMA = Joi.object({
  branchesId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  phone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE).required(),
  address: Joi.string().min(5).max(200).required(),
  note: Joi.string().max(255).optional(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now)
})

const validateBeforeCreate = async (data) => {
  return await SUPPLIERS_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newSupplierToAdd = {
      ...validData,
      branchesId: new ObjectId(validData.branchesId)
    }

    const result = await GET_DB().collection(SUPPLIERS_COLLECTION_NAME).insertOne(newSupplierToAdd)
    return result
  } catch (error) { throw new Error(error) }
}

const findOneById = async (supplierId) => {
  try {
    return await GET_DB().collection(SUPPLIERS_COLLECTION_NAME).findOne({ _id: new ObjectId(supplierId) })
  } catch (error) { throw new Error(error) }
}

const getAll = async () => {
  try {
    return await GET_DB().collection(SUPPLIERS_COLLECTION_NAME).find().toArray()
  } catch (error) { throw new Error(error) }
}

export const supplierModel = {
  createNew,
  findOneById,
  getAll
}
