import { supplierModel } from '~/models/supplierModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const createSupplier = await supplierModel.createNew(reqBody)
    const newSupplier = await supplierModel.findOneById(createSupplier.insertedId)
    return newSupplier
  } catch (error) { throw error }
}

const getAll = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await supplierModel.getAll()
  } catch (error) { throw error }
}

export const supplierService = {
  createNew,
  getAll
}
