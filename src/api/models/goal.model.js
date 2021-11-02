import mongoose from 'mongoose'
const { Schema } = mongoose

/* const {
  DEFAULT_GOAL_STATUS_ID,
  DEFAULT_GOAL_STATUS_NAME,
  DEFAULT_GOAL_TYPE_ID,
  DEFAULT_GOAL_TYPE_NAME,
  DEFAULT_NOTIFICATION_FREQUENCY_ID,
  DEFAULT_NOTIFICATION_FREQUENCY_NAME
} = process.env */

const goalSchema = new Schema({
  name: String,
  description: String,
  endDate: {
    type: Date,
    default: Date.now()
  },
  user: {
    authId: String,
    email: {
      type: String,
      match: /.+@.+\..+/
    }
  },
  goalStatus: {
    id: {
      type: String,
      default: 'Hola'
    },
    name: {
      type: String,
      default: 'Hola'
    }
  },
  goalType: {
    id: {
      type: String,
      default: 'Hola'
    },
    name: {
      type: String,
      default: 'Hola'
    }
  },
  notificationFrequency: {
    id: {
      type: String,
      default: 'Hola'
    },
    name: {
      type: String,
      default: 'Hola'
    }
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

const GoalModel = mongoose.model('goal', goalSchema)

export default GoalModel
