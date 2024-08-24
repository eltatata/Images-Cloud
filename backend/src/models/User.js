import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token : {
    type: String
  },
  confirmed: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true,
});

export const User = model("User", userSchema);