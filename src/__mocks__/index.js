const { user, invalidUser } = require('./user.mock')
const { goalType, goalTypeInvalid } = require('./goal-type.mock')
const { goalStatus, goalStatusInvalid, goalStatusId } = require('./goal-status.mock')
const { notificationFrequency, notificationFrequencyInvalid } = require('./notification-frequency.mock')
const { goal, goalInvalid, goalInvalidCatalogue } = require('./goal.mock')
const { rightThing } = require('./right-thing.mock')

module.exports = {
  user,
  invalidUser,
  goalType, 
  goalTypeInvalid,
  goalStatus,
  goalStatusInvalid,
  goalStatusId,
  notificationFrequency,
  notificationFrequencyInvalid,
  goal,
  goalInvalid,
  goalInvalidCatalogue,
  rightThing
}
