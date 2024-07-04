import mongoose, { Schema, Document } from "mongoose";

export interface IFoodList extends Document {
  name: string;
  price: number;
  image: string;
  branches: string[];
}

const foodListSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  branches: { type: [String], required: false },
});


export const FoodList = mongoose.model<IFoodList>("FoodList", foodListSchema);
