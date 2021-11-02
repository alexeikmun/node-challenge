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
    const { authId, email } = request.user
    const goalTypeData = await goalTypeService.getGoalTypeById(goalType.id)
    const notificationFrequencyData = await notificationFrequencyService.getNotificationFrequencyById(notificationFrequency.id)

    if (goalTypeData && notificationFrequencyData) {
      const goal = await goalService.createGoal({
        name,
        description,
        user: {
          authId,
          email
        },
        goalType: {
          id: goalTypeData._id,
          name: goalTypeData.name
        },
        notificationFrequency: {
          id: notificationFrequencyData._id,
          name: notificationFrequencyData.name
        },
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

  router.get('/goal', auth, tryCatch(async (request, response) => {
    const { goalStatusId } = request.query
    const { authId } = request.user
    const goals = await goalService.findGoals({
      'goalStatus.id': goalStatusId,
      'user.authId': authId
    })

    return response.send(goals)
  }))
}

export default GoalController
