// auth.model.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  phone_number: { type: String },
  blood_group: { type: String },
  date_of_birth: { type: Date },
  gender: { type: String },
  image_url: { type: String },
});

export const User = mongoose.model("User", userSchema);
