import { GoalService } from '../services'
import { GoalValidator } from '../validators'

const GoalController = ({ router, auth, validator, tryCatch }) => {
  const goalService = GoalService()

  router.post('/goal', auth, goalValidator, validator, tryCatch(async (request, response) => {
    const { name, description, goalType, notificationFrequency, endDate } = request.body
    // Get the information of the user
    // Get the information of goalType, notificationFrequency
    // Create the goal
    
    const goal = goalService.createGoal({ email, name })

    return response.send(goal)
  }))
}

export default GoalController
