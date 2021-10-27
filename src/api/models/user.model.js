import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
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

const UserModel = mongoose.model('user', UserSchema)

export default UserModel
