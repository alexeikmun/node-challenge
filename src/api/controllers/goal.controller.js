import { GoalService, GoalTypeService, NotificationFrequencyService } from '../services'
import { goalValidator } from '../validators'
import i18n from 'i18n'

const GoalController = ({ router, auth, validator, tryCatch }) => {
  const goalService = GoalService()
  const goalTypeService = GoalTypeService()
  const notificationFrequencyService = NotificationFrequencyService()
  const { STATUS_CODE_BAD_REQUEST } = process.env

  router.post('/goal', auth, goalValidator, validator, tryCatch(async (request, response) => {
    const { name, description, goalType, notificationFrequency, endDate } = request.body
    const { user } = request
    const goalTypeData = await goalTypeService.getGoalTypeById(goalType.id)
    const notificationFrequencyData = await notificationFrequencyService.getNotificationFrequencyById(notificationFrequency.id)

    if (goalTypeData && notificationFrequencyData) {
      const goal = await goalService.createGoal({
        name,
        description,
        user,
        goalType,
        notificationFrequency,
        endDate
      })

      return response.send(goal)
    } else {
      return response.status(STATUS_CODE_BAD_REQUEST).send({
        code: Number(STATUS_CODE_BAD_REQUEST),
        message: i18n.__('goal-controller.invalid-goal-frequency')
      })
    }
  }))
}

export default GoalController
