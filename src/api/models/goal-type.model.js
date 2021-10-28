import mongoose from 'mongoose'
const { Schema } = mongoose

const goalTypeSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  active: {
    type: Boolean,
    default: true
  },
  createdDate: Date
})

const GoalTypeModel = mongoose.model('goalType', goalTypeSchema)

export { goalTypeSchema, GoalTypeModel }
