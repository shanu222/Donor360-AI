import mongoose from "mongoose";

const recommendationLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    filters: {
      cause: { type: [String], default: [] },
      budget: Number,
      location: String,
      priority: String,
    },
    results: [
      {
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
        score: Number,
        reason: String,
        expectedImpact: String,
      },
    ],
  },
  { timestamps: true }
);

export const RecommendationLog =
  mongoose.models.RecommendationLog ||
  mongoose.model("RecommendationLog", recommendationLogSchema);
