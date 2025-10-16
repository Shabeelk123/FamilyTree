import mongoose, { Schema, Document } from "mongoose";

export interface IMember extends Document {
  name: string;
  gender: "male" | "female";
  age: number;
  familyName: string;
  parentIds?: mongoose.Types.ObjectId[]; // Array for both parents
  spouseId?: mongoose.Types.ObjectId;
}

const memberSchema = new Schema<IMember>(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    age: Number,
    familyName: { type: String, required: true },
    parentIds: [{ type: Schema.Types.ObjectId, ref: "Member" }],
    spouseId: { type: Schema.Types.ObjectId, ref: "Member" },
  },
  { timestamps: true }
);

const Member = mongoose.model<IMember>("Member", memberSchema);

export default Member;
