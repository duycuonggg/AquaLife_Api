import { ordersModel } from '~/models/ordersModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newOrders = {
      ...reqBody
    }

    const createOrders = await ordersModel.createNew(newOrders)
    return createOrders
  } catch (error) { throw error }
}

export const ordersService = {
  createNew
}