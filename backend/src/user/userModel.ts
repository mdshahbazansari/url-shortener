import mongoose, { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userModel = new Schema(
  {
    fullname: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
)

userModel.pre('save', async function (next) {
  const hashPassword = await bcrypt.hash(this.password.toString(), 12)
  this.password = hashPassword
  next()
})

const UserModel = model('User', userModel)
export default UserModel
