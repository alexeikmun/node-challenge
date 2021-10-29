import { GoalTypeModel } from '../models/goal-type.model'

const GoalTypeService = () => {
  const createGoalType = async (goalType) => await GoalTypeModel.create(goalType)
  const getGoalTypes = async () => await GoalTypeModel.find()
  const existGoalType = async (query) => await GoalTypeModel.exists(query)

  return {
    createGoalType,
    getGoalTypes,
    existGoalType
  }
}

export default GoalTypeService
