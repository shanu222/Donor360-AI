import mongoose from "mongoose";

const CATEGORIES = ["Women", "Climate", "Health", "Education"];
const SOURCES = ["She360", "Resilience360", "Internal"];

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true, enum: CATEGORIES },
    location: { type: String, required: true },
    impactScore: { type: Number, required: true, min: 0, max: 100 },
    urgencyScore: { type: Number, required: true, min: 0, max: 100 },
    scaleScore: { type: Number, required: true, min: 0, max: 100 },
    minBudget: { type: Number, required: true, min: 0 },
    dataSource: { type: String, required: true, enum: SOURCES },
    description: { type: String, required: true },
    beneficiaryEstimate: { type: Number, default: 1000 },
    impactPerThousandUsd: { type: Number, default: 20 },
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
