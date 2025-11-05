import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validatiors.js'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    ordersId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

    productsId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

    quantity: Joi.number().integer().min(1).required().messages({
      'number.base': '"quantity" must be a number.',
      'number.min': '"quantity" must be at least 1.',
      'any.required': '"quantity" is required.'
    }),

    priceAtOrder: Joi.number().precision(2).min(0).required().messages({
      'number.base': '"priceAtOrder" must be a number.',
      'number.min': '"priceAtOrder" must be >= 0.',
      'any.required': '"priceAtOrder" is required.'
    }),

    subtotal: Joi.number().precision(2).min(0).optional().messages({
      'number.base': '"subtotal" must be a number.'
    })
  })


  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const orderDetailsValidation = {
  createNew
}