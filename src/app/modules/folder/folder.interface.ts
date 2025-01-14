import mongoose, { Document } from "mongoose";

export interface IFolder extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  name: string;
}
