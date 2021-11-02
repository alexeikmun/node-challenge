import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  authId: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    match: /.+@.+\..+/
  },
  name: String,
  createdDate: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('user', userSchema)
