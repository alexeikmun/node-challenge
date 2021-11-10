import { GoalModel } from '../models'

const GoalService = () => {
  const createGoal = async (goal) => await GoalModel.create(goal)
  const updateGoal = async (query, data) => await GoalModel.updateOne(query, data)
  const deleteGoal = async (query) => await GoalModel.deleteOne(query)
  const findGoals = async (query) => await GoalModel.find(query)
  const findGoal = async (query) => await GoalModel.findOne(query)
  const countGoal = async (query) => await GoalModel.countDocuments(query)
  const existGoal = async (query) => await GoalModel.exists(query)

  return {
    createGoal,
    updateGoal,
    deleteGoal,
    findGoals,
    findGoal,
    countGoal,
    existGoal
  }
}

export default GoalService
