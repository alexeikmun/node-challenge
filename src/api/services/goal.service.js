import { GoalModel } from '../models'

const GoalService = () => {
  const createGoal = async (goal) => await GoalModel.create(goal)

  return {
    createGoal
  }
}

export default GoalService
