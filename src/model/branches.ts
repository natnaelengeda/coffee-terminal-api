import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBranches extends Document {
  name: string;
  image: string;
  gate: string;
  description: string;
  location: string;
  locationOnMap: string;
  additional: [];
}

const branchesSchema: Schema = new Schema({
  name: { type: String, rqeuired: true },
  image: { type: String, requried: false, default: "" },
  gate: { type: String, required: true },
  description: { type: String, required: false, default: "" },
  location: { type: String, required: false, default: "" },
  locationOnMap: { type: String, required: false, default: "" },
  additional: { type: [Schema.Types.Mixed], required: false, default: [] },
});

export const BranchesModel = mongoose.model<IBranches>("Branches", branchesSchema);