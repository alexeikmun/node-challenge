import { GoalTypeService } from '../services'
import { goalTypeValidator } from '../validators'

const GoalTypeController = ({ router, auth, tryCatch, validator }) => {
  const goalTypeService = GoalTypeService()

  router.post('/goal-type', auth, goalTypeValidator, validator, tryCatch(async (request, response) => {
    const { name, description } = request.body
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
