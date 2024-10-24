import { model, Schema, Types } from "mongoose";
import { IFoods } from "./food.interface";

const foodSchema = new Schema<IFoods>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category_id: { type: Schema.Types.ObjectId, required: true },
  category_name: { type: String, required: true },
  quantity: { type: Number, required: true},
  unit:{type:String, required: true},
  description: { type: String },
  image_url:{type:String},
});

// export const Food = model('Food',foodSchema)
const Foods =  model<IFoods>("Foods", foodSchema);
export default Foods;