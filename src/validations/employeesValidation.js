import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { PHONE_RULE, PHONE_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validatiors.js'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    branchesId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

    name: Joi.string().min(3).max(100).required().messages({
      'string.base': '"name" must be a string.',
      'string.empty': '"name" cannot be an empty field.',
      'string.min': '"name" should have a minimum length of {#limit} characters.',
      'string.max': '"name" should have a maximum length of {#limit} characters.',
      'any.required': '"name" is a required field.'
    }),

    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.base': '"email" must be a string.',
      'string.empty': '"email" cannot be an empty field.',
      'string.email': '"email" must be a valid email address.',
      'any.required': '"email" is a required field.'
    }),

    phone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),

    role: Joi.string().valid('admin', 'manager', 'staff').required().messages({
      'string.base': '"role" must be a string.',
      'any.only': '"role" must be one of [admin, manager, staff].',
      'any.required': '"role" is a required field.'
    }),

    password: Joi.string().min(10).max(100).required().messages({
      'string.base': '"password" must be a string.',
      'string.empty': '"password" cannot be an empty field.',
      'string.min': '"password" is too short. It must be a valid hashed password (min {#limit} characters).',
      'string.max': '"password" is too long.',
      'any.required': '"password" is a required field.'
    })
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const employeesValidation = {
  createNew
}