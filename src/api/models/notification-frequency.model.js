import mongoose from 'mongoose'
const { Schema } = mongoose

const notificationSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  active: {
    type: Boolean,
    default: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

const NotificationFrequencyModel = mongoose.model('notification', notificationSchema)

export { notificationSchema, NotificationFrequencyModel }
