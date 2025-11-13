import { StatusCodes } from 'http-status-codes'
import { headquaterService } from '~/services/headquaterService'

const createNew = async (req, res, next) => {

  try {
    const createHeadquater = await headquaterService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createHeadquater)
  } catch (error) { next(error) }
}

export const headquaterController = {
  createNew
}
