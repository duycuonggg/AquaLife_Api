import { productsModel } from '~/models/productsModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newproducts = {
      ...reqBody
    }

    const createproducts = await productsModel.createNew(newproducts)
    return createproducts
  } catch (error) { throw error }
}

export const productsService = {
  createNew
}