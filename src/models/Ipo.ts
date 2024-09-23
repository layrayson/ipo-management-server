import { Schema, model, Document } from "mongoose";

interface IIpo extends Document {
  ipoNumber: string;
  issuerName: string;
  issuerLogo?: string;
  issuerIndustry: string;
  sharePrice: number;
  minVolume: number;
  totalShares: number;
  issuanceType: string;
  documents: string[];
  startDate: Date;
  endDate: Date;
  receivingAgents: string[];
  createdBy: Schema.Types.ObjectId;
}

const IpoSchema = new Schema<IIpo>({
  ipoNumber: { type: String, required: true, unique: true },
  issuerName: { type: String, required: true },
  issuerLogo: { type: String },
  issuerIndustry: { type: String, required: true },
  sharePrice: { type: Number, required: true },
  minVolume: { type: Number, required: true },
  totalShares: { type: Number, required: true },
  issuanceType: { type: String, required: true },
  documents: { type: [String] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  receivingAgents: { type: [String] },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Ipo = model<IIpo>("Ipo", IpoSchema);
