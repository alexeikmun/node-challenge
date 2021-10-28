import mongoose from 'mongoose'
const { Schema } = mongoose

const notificationSchema = new Schema({
  name: String,
  description: String,
  active: {
    type: Boolean,
    default: true
  },
  createdDate: Date
})

const NotificationFrequencyModel = mongoose.model('notification', notificationSchema)

export { notificationSchema, NotificationFrequencyModel }
