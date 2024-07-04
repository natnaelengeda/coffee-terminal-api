import mongoose, { Schema, Document } from "mongoose";

interface IFoodItem {
  id: string;
  image: string;
  name: string;
  price: number;
  branches: string[];
}

export interface IFood extends Document {
  title: string;
  foodList: IFoodItem[];
}

const foodItemSchema: Schema = new Schema({
  id: { type: String, required: true },
  image: { type: String, required: false },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  branches: [{ type: String, required: true }],
});

const foodSchema: Schema = new Schema({
  title: { type: String, required: true },
  foodList: { type: [foodItemSchema], required: false },
});

export const Food = mongoose.model<IFood>("Food", foodSchema);