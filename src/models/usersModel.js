import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'

const USERS_COLLECTION_NAME = 'users'
const USERS_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).max(200).required(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now)
})

const validateBeforeCreate = async (data) => {
  return await USERS_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const findByEmail = async (email) => {
  try {
    return await GET_DB().collection(USERS_COLLECTION_NAME).findOne({ email })
  } catch (error) { throw new Error(error) }
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newUser = { ...validData }
    const created = await GET_DB().collection(USERS_COLLECTION_NAME).insertOne(newUser)
    return created
  } catch (error) { throw new Error(error) }
}

export const usersModel = {
  createNew,
  findByEmail
}
