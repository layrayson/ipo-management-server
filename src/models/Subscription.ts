import { Schema, model, Document } from "mongoose";

interface ISubscription extends Document {
  ipo: Schema.Types.ObjectId;
  investor: Schema.Types.ObjectId;
  volume: number;
  paymentMethod: "online" | "offline";
}

const SubscriptionSchema = new Schema<ISubscription>({
  ipo: { type: Schema.Types.ObjectId, ref: "Ipo", required: true },
  investor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  volume: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["online", "offline"], required: true },
});

export const Subscription = model<ISubscription>(
  "Subscription",
  SubscriptionSchema
);
