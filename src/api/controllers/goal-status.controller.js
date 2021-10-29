import { GoalStatusService } from '../services'
import { goalStatusValidator } from '../validators'
import i18n from 'i18n'

const GoalStatusController = ({ router, auth, validator, tryCatch }) => {
  const goalStatusService = GoalStatusService()
  const { STATUS_CODE_BAD_REQUEST } = process.env

  router.post('/goal-status', auth, goalStatusValidator, validator, tryCatch(async (request, response) => {
    const { name, description } = request.body
    const exist = await goalStatusService.existGoalStatus({ name })
    if (exist) {
      return response.status(STATUS_CODE_BAD_REQUEST).send({
        code: STATUS_CODE_BAD_REQUEST,
        message: i18n.__('api.already-exist')
      })
    }

    const goalStatus = await goalStatusService.createGoalStatus({ name, description })
    return response.send(goalStatus)
  }))

  router.get('/goal-status', auth, goalStatusValidator, validator, tryCatch(async (request, response) => {
    const goalStatus = await goalStatusService.getGoalStatus()

    return response.send(goalStatus)
  }))
}

export default GoalStatusController
