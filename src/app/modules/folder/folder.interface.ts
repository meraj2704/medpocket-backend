import mongoose, { Document } from "mongoose";

export interface IFolder extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  name: string;
}

export interface FolderData {
  user_id: string;
  name: string;
}
