import mongoose, { Schema, Document } from "mongoose";

export interface IEmailSubscription extends Document {
  email: string;

  // Timestamp
  createdAt: Date;
  updatedAt: Date;
}

const emailSubscriptionSchema: Schema = new Schema({
  email: { type: String, required: true },

  // Timestamp
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const EmailSubscription = mongoose.model<IEmailSubscription>("EmailSubscription", emailSubscriptionSchema);
