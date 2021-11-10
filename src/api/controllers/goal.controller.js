import { GoalService, GoalTypeService, GoalStatusService, NotificationFrequencyService } from '../services'
import { goalValidator, goalChangeStatusValidator, idValidator } from '../validators'
import i18n from 'i18n'

const GoalController = ({ router, auth, validator, tryCatch }) => {
  const goalService = GoalService()
  const goalTypeService = GoalTypeService()
  const goalStatusService = GoalStatusService()
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

  router.put('/goal/:id', auth, idValidator, goalValidator, validator, tryCatch(async (request, response) => {
    const { name, description, goalType, notificationFrequency, endDate } = request.body
    const { authId, email } = request.user
    const { id } = request.params

    const goal = await goalService.findGoal({ 'goal._id': id, 'user.authId': authId })
    const goalTypeData = await goalTypeService.getGoalTypeById(goalType.id)
    const notificationFrequencyData = await notificationFrequencyService.getNotificationFrequencyById(notificationFrequency.id)

    if (goal && goalTypeData && notificationFrequencyData) {
      await goalService.updateGoal({ _id: id }, {
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

      return response.send({ id })
    } else {
      return response.status(STATUS_CODE_BAD_REQUEST).send({
        code: Number(STATUS_CODE_BAD_REQUEST),
        message: i18n.__('goal-controller.update-invalid-goal')
      })
    }
  }))

  router.delete('/goal/:id', auth, idValidator, validator, tryCatch(async (request, response) => {
    const { authId } = request.user
    const { id } = request.params

    const goal = await goalService.deleteGoal({
      _id: id,
      'user.authId': authId
    })

    return response.send(goal)
  }))

  router.get('/goal/:id', auth, idValidator, validator, tryCatch(async (request, response) => {
    const { authId } = request.user
    const { id } = request.params

    const goal = await goalService.findGoal({
      _id: id,
      'user.authId': authId
    })

    return response.send(goal)
  }))

  router.put('/goal/status/:id', auth, goalChangeStatusValidator, validator, tryCatch(async (request, response) => {
    const { id } = request.params
    const { goalStatus } = request.body
    const { authId } = request.user

    const goal = await goalService.findGoal({
      'goal._id': id,
      'user.authId': authId
    })

    const goalStatusData = await goalStatusService.getGoalStatusById(goalStatus.id)

    if (goal && goalStatusData) {
      await goalService.updateGoal({ _id: id }, {
        $set: {
          goalStatus: {
            id: goalStatusData.id,
            name: goalStatusData.name
          }
        }
      })
      return response.send({ id })
    } else {
      return response.status(STATUS_CODE_BAD_REQUEST).send({
        code: Number(STATUS_CODE_BAD_REQUEST),
        message: i18n.__('goal-controller.invalid-goal')
      })
    }
  }))

  return router
}

export default GoalController
