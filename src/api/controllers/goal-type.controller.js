import { GoalTypeService } from '../services'
import { goalTypeValidator } from '../validators'
import i18n from 'i18n'

const GoalTypeController = ({ router, auth, tryCatch, validator }) => {
  const goalTypeService = GoalTypeService()
  const { STATUS_CODE_BAD_REQUEST } = process.env

  router.post('/goal-type', auth, goalTypeValidator, validator, tryCatch(async (request, response) => {
    const { name, description } = request.body
    const exist = await goalTypeService.existGoalType({ name })
    if (exist) {
      return response.status(STATUS_CODE_BAD_REQUEST).send({
        code: Number(STATUS_CODE_BAD_REQUEST),
        message: i18n.__('api.already-exist')
      })
    }

    const goalType = await goalTypeService.createGoalType({ name, description })
    return response.send(goalType)
  }))

  router.get('/goal-type', auth, tryCatch(async (request, response) => {
    const goalTypes = await goalTypeService.getGoalTypes()

    return response.send(goalTypes)
  }))

  return router
}

export default GoalTypeController
