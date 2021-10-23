import { GoalService } from '../services'

const GoalController = ({ router, auth }) => {
  const goalService = GoalService()

  router.post('/goal', auth, async (request, response) => {
    const { email, name } = request.body
    // Do some validations, clean data

    const goal = goalService.createGoal({ email, name })

    return response.send(goal)
  })
}

export default GoalController
