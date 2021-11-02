import mongoose from 'mongoose'
import { catalogueTransform } from './transforms'
const { Schema } = mongoose

const notificationFrequencySchema = new Schema({
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
}, catalogueTransform)

const NotificationFrequencyModel = mongoose.model('notification', notificationFrequencySchema)

export { notificationFrequencySchema, NotificationFrequencyModel }
