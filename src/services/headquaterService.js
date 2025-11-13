import { headquaterModel } from '~/models/headquaterModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newHeadquater = {
      ...reqBody
    }

    const createHeadquater = await headquaterModel.createNew(newHeadquater)
    return createHeadquater
  } catch (error) { throw error }
}

export const headquaterService = {
  createNew
}