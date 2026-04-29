import mongoose from "mongoose";

const donationEntrySchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    amountUsd: { type: Number, required: true },
    estimatedLivesImpacted: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, default: null },
    firebaseUid: { type: String, default: null, sparse: true, index: true },
    savedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    donationHistory: [donationEntrySchema],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
