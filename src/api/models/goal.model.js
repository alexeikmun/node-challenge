import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
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
    authId: String,
    email: {
      type: String,
      match: /.+@.+\..+/
    }
  },
  goalStatus: {
    id: {
      type: String,
      default: DEFAULT_GOAL_STATUS_ID
    },
    name: {
      type: String,
      default: DEFAULT_GOAL_STATUS_NAME
    }
  },
  goalType: {
    id: {
      type: String,
      default: DEFAULT_GOAL_TYPE_ID
    },
    name: {
      type: String,
      default: DEFAULT_GOAL_TYPE_NAME
    }
  },
  notificationFrequency: {
    id: {
      type: String,
      default: DEFAULT_NOTIFICATION_FREQUENCY_ID
    },
    name: {
      type: String,
      default: DEFAULT_NOTIFICATION_FREQUENCY_NAME
    }
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

export default mongoose.model('goal', goalSchema)
