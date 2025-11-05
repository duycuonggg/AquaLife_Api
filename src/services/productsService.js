import { productsModel } from '~/models/productsModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newProducts = {
      ...reqBody
    }

    const createProducts = await productsModel.createNew(newProducts)
    return createProducts
  } catch (error) { throw error }
}

export const productsService = {
  createNew
}