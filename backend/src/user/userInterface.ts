import mongoose from 'mongoose'

export interface userInterface {
  _id: mongoose.Schema.Types.ObjectId;
  fullname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
