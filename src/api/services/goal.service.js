import { GoalModel } from '../models'

const GoalService = () => {
  const createGoal = async (goal) => {
    console.log('goal -->', goal)
    return await GoalModel.create(goal)
  }
  const updateGoal = async (id, goal) => await GoalModel.updateOne({ _id: id }, goal)
  const deleteGoal = async (id) => await GoalModel.deleteOne({ _id: id })
  const findGoals = async (query) => {
    console.log('query -->', query)
    return await GoalModel.find(query)
  }
  const findGoal = async (query) => await GoalModel.findOne(query)
  const existGoal = async (query) => await GoalModel.exists(query)

  return {
    createGoal,
    updateGoal,
    deleteGoal,
    findGoals,
    findGoal,
    existGoal
  }
}

export default GoalService
