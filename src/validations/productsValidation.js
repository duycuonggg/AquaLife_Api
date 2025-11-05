import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validatiors.js'

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

    type: Joi.string().min(2).max(50).required().messages({
      'string.base': '"type" must be a string.',
      'string.empty': '"type" cannot be an empty field.',
      'string.min': '"type" should have a minimum length of {#limit} characters.',
      'string.max': '"type" should have a maximum length of {#limit} characters.',
      'any.required': '"type" is a required field.'
    }),

    price: Joi.number().min(1000).precision(0).required().messages({
      'number.base': '"price" must be a number.',
      'number.min': '"price" must be greater than or equal to {#limit}.',
      'any.required': '"price" is a required field.'
    }),

    quantity: Joi.number().integer().min(0).required().messages({
      'number.base': '"quantity" must be a number.',
      'number.integer': '"quantity" must be an integer.',
      'number.min': '"quantity" cannot be less than zero.',
      'any.required': '"quantity" is a required field.'
    }),

    description: Joi.string().min(10).max(500).required().messages({
      'string.base': '"description" must be a string.',
      'string.empty': '"description" cannot be an empty field.',
      'string.min': '"description" should have a minimum length of {#limit} characters.',
      'string.max': '"description" should have a maximum length of {#limit} characters.',
      'any.required': '"description" is a required field.'
    }),

    imageUrl: Joi.string().uri().required().messages({
      'string.base': '"imageUrl" must be a string.',
      'string.empty': '"imageUrl" cannot be an empty field.',
      'string.uri': '"imageUrl" must be a valid URL.',
      'any.required': '"imageUrl" is a required field.'
    }),

    status: Joi.string().valid('available', 'out_of_stock', 'discontinued').required().messages({
      'string.base': '"status" must be a string.',
      'string.empty': '"status" cannot be an empty field.',
      'any.only': '"status" must be one of [available, out_of_stock, discontinued].',
      'any.required': '"status" is a required field.'
    })
  })


  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const productsValidation = {
  createNew
}