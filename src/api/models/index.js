import createGoalModel from './goal.model'
const GoalModel = createGoalModel()

export { default as UserModel } from './user.model'
export { default as GoalTypeModel } from './goal-type.model'
export { default as GoalStatusModel } from './goal-status.model'
export { default as NotificationFrequencyModel } from './notification-frequency.model'
export { GoalModel }
