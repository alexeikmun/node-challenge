import { GoalStatusModel } from '../models'

const GoalStatusService = () => {
  const createGoalStatus = async (goalStatus) => await GoalStatusModel.create(goalStatus)
  const getGoalStatus = async () => await GoalStatusModel.find()
  const existGoalStatus = async (query) => await GoalStatusModel.exists(query)

  return {
    createGoalStatus,
    getGoalStatus,
    existGoalStatus
  }
}

export default GoalStatusService
