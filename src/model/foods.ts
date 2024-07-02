import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFood extends Document {
  title: string;
  foodList: any[][];
}

const foodSchema: Schema = new Schema({
  title: { type: String, required: true },
  foodList: { type: [[Schema.Types.Mixed]], required: false },
});


export const Food = mongoose.model<IFood>("Food", foodSchema);