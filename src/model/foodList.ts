import mongoose, { Schema, Document } from "mongoose";

const foodListSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export interface IFoodList extends Document {
  name: string;
  price: number;
  image: string;
}

export const FoodList = mongoose.model<IFoodList>("FoodList", foodListSchema);
