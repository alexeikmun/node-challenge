import mongoose from 'mongoose'
import { catalogueTransform } from './transforms'
const { Schema } = mongoose

const goalStatusSchema = new Schema({
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

const GoalStatusModel = mongoose.model('goalStatus', goalStatusSchema)

export {
  goalStatusSchema,
  GoalStatusModel
}
