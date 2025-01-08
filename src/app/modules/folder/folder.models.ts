import { Schema } from "mongoose";
import { IFolder } from "./folder.interface";

const FolderSchema = new Schema<IFolder>({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: string, required: true },
    date: { type: Date, default: Date.now },
  });
  
  export const Glucose = mongoose.model<GlucoseDocument>(
    "Glucose",
    GlucoseSchema
  );