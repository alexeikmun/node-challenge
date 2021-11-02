const { user, invalidUser } = require('./user.mock')
const { goalType, goalTypeInvalid } = require('./goal-type.mock')
const { goalStatus, goalStatusInvalid } = require('./goal-status.mock')
const { notificationFrequency, notificationFrequencyInvalid } = require('./notification-frequency.mock')
const { goal, goalInvalid, goalInvalidCatalogue } = require('./goal.mock')

module.exports = {
  user,
  invalidUser,
  goalType, 
  goalTypeInvalid,
  goalStatus,
  goalStatusInvalid,
  notificationFrequency,
  notificationFrequencyInvalid,
  goal,
  goalInvalid,
  goalInvalidCatalogue
}
