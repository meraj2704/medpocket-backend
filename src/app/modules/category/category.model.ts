import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String, unique: false},
  image_url: { type: String },
  image_file_name: { type: String },
});

// export const Category = model("Category", categorySchema);
const Category = model<ICategory>("Category", categorySchema);
export default Category;
