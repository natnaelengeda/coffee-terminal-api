import mongoose, { Schema, Document, Types } from "mongoose";

const foodSchema: Schema = new Schema({
  title: { type: String, required: true },
  foodList: { type: [[Schema.Types.Mixed]], required: false },
});

export interface IFood extends Document {
  title: string;
  foodList: any[][];
}

export const Food = mongoose.model<IFood>("Food", foodSchema);