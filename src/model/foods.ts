import mongoose, { Schema, Document } from "mongoose";

const foodSchema: Schema = new Schema({
  title: { type: String, required: true },
  foods: { type: Array, required: true },
});

export interface IFood extends Document {
  title: string;
  foods: string[];
}

export const Food = mongoose.model<IFood>("Food", foodSchema);