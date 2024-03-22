import mongoose, { Schema, Document } from "mongoose";

const adminSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  accessToken: { type: String, required: false },
  refreshToken: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  accessToken?: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);