import { GoalStatusModel } from '../models'

const GoalStatusService = () => {
  const createGoalStatus = async (goalStatus) => await GoalStatusModel.create(goalStatus)
  const getGoalStatus = async () => await GoalStatusModel.find()
  const getGoalStatusById = async (id) => await GoalStatusModel.findById(id)
  const existGoalStatus = async (query) => await GoalStatusModel.exists(query)

  return {
    createGoalStatus,
    getGoalStatus,
    getGoalStatusById,
    existGoalStatus
  }
}

export default GoalStatusService
