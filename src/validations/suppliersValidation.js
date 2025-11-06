import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { PHONE_RULE, PHONE_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validatiors.js'

const createNew = async (req, res, next) => {
  const schema = Joi.object({
    branchesId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),


    name: Joi.string().min(3).max(100).required().messages({
      'string.base': '"name" must be a string.',
      'string.empty': '"name" cannot be an empty field.',
      'string.min': '"name" should have at least {#limit} characters.',
      'string.max': '"name" should have at most {#limit} characters.',
      'any.required': '"name" is a required field.'
    }),

    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.base': '"email" must be a string.',
      'string.empty': '"email" cannot be empty.',
      'string.email': '"email" must be a valid email address.',
      'any.required': '"email" is a required field.'
    }),

    phone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE).required(),

    address: Joi.string().min(5).max(200).required().messages({
      'string.base': '"address" must be a string.',
      'string.empty': '"address" cannot be an empty field.',
      'string.min': '"address" should have a minimum length of {#limit} characters.',
      'string.max': '"address" should have a maximum length of {#limit} characters.',
      'any.required': '"address" is a required field.'
    }),

    note: Joi.string().max(255).optional().messages({
      'string.base': '"note" must be a string.',
      'string.max': '"note" cannot exceed {#limit} characters.'
    })
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const suppliersValidation = {
  createNew
}
