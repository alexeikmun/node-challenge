import mongoose from 'mongoose'
import { userSchema } from './user.model'
import { goalStatusSchema } from './goal-status.model'
import { goalTypeSchema } from './goal-type.model'
import { notificationFrequencySchema } from './notification-frequency.model'

const { Schema } = mongoose

const {
  DEFAULT_GOAL_STATUS_ID,
  DEFAULT_GOAL_STATUS_NAME,
  DEFAULT_GOAL_TYPE_ID,
  DEFAULT_GOAL_TYPE_NAME,
  DEFAULT_NOTIFICATION_FREQUENCY_ID,
  DEFAULT_NOTIFICATION_FREQUENCY_NAME
} = process.env

const goalSchema = new Schema({
  name: String,
  description: String,
  endDate: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: userSchema
  },
  goalStatus:{
    type: goalStatusSchema,
    default: {
      _id: DEFAULT_GOAL_STATUS_ID,
      name: DEFAULT_GOAL_STATUS_NAME
    }
  },
  goalTypeSchema: {
    type: goalTypeSchema,
    default: {
      _id: DEFAULT_GOAL_TYPE_ID,
      name: DEFAULT_GOAL_TYPE_NAME,
    }
  },
  notificationFrequency: {
    type: notificationFrequencySchema,
    default: {
      _id: DEFAULT_NOTIFICATION_FREQUENCY_ID,
      name: DEFAULT_NOTIFICATION_FREQUENCY_NAME
    }
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

const GoalModel = mongoose.model('goal', goalSchema)

export default GoalModel
