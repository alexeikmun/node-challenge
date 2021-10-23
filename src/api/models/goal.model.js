import mongoose from 'mongoose'
const { Schema } = mongoose

const goalSchema = new Schema({
  email: String,
  name: String
})

const GoalModel = mongoose.model('goal', goalSchema)

export default GoalModel
