import { branchesModel } from '~/models/branchesModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBranches = {
      ...reqBody
    }

    const createBranches = await branchesModel.createNew(newBranches)
    return createBranches
  } catch (error) { throw error }
}

const getAll = async () => {
  const items = await branchesModel.getAll()
  return items
}

export const branchesService = {
  createNew,
  getAll
}