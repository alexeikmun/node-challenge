import mongoose from 'mongoose'
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
})

const GoalStatusModel = mongoose.model('goalStatus', goalStatusSchema)

export {
  goalStatusSchema,
  GoalStatusModel
}
