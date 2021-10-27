import { GoalService } from '../services'

const GoalController = ({ router, auth, tryCatch }) => {
  const goalService = GoalService()

  router.post('/goal', auth, tryCatch(async (request, response) => {
    const { email, name } = request.body
    // Do some validations, clean data

    const goal = goalService.createGoal({ email, name })

    return response.send(goal)
  }))
}

export default GoalController
