import mongoose, { model, Schema } from 'mongoose'

const urlSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitedHistory: [{ timeStamp: { type: Number } }],
  },
  { timestamps: true }
)

const UrlModel = model('Url', urlSchema)
export default UrlModel
