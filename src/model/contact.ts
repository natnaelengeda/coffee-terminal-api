import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;

  // Timestamp
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },

  // Timestamp
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Contact = mongoose.model<IContact>("Contact", contactSchema);
