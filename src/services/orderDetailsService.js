import { orderDetailsModel } from '~/models/orderDetailsModel'

const createNew = async (reqBody) => {
  const subtotal = reqBody.subtotal || (reqBody.quantity * reqBody.priceAtOrder)
  // eslint-disable-next-line no-useless-catch
  try {
    const newOrderDetails = {
      ...reqBody,
      subtotal
    }

    const createOrderDetails = await orderDetailsModel.createNew(newOrderDetails)

    const getNewOrderDetails = await orderDetailsModel.findOneById(createOrderDetails.insertedId)
    return getNewOrderDetails
  } catch (error) { throw error }
}

export const orderDetailsService = {
  createNew
}