import { GoalTypeModel } from '../models/goal-type.model'

const GoalTypeService = () => {
  const createGoalType = async (goalType) => await GoalTypeModel.create(goalType)
  const getGoalTypes = async () => await GoalTypeModel.find()

  return {
    createGoalType,
    getGoalTypes
  }
}

export default GoalTypeService
