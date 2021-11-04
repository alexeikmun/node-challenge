import mongoose from 'mongoose'
const { Schema } = mongoose

const rightThingSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  user: {
    authId: String,
    email: {
      type: String,
      match: /.+@.+\..+/
    }
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

export default mongoose.model('rightThing', rightThingSchema)
