import mongoose from 'mongoose'
const { Schema } = mongoose

const goalStatusSchema = new Schema({
  name: String,
  description: String,
  active: {
    type: String,
    default: true
  },
  createdDate: Date
})

const GoalStatusModel = mongoose.model('goalStatus', goalStatusSchema)

export {
  goalStatusSchema,
  GoalStatusModel
}
