import { Project } from "../models/Project.js";
import { RecommendationLog } from "../models/RecommendationLog.js";
import { runRecommendationEngine } from "../services/recommendationEngine.js";
import { ApiError } from "../utils/apiError.js";

export async function createRecommendations(req, res, next) {
  try {
    const { cause, budget, location, priority } = req.body;
    if (budget === undefined || budget === null) {
      throw new ApiError(400, "budget is required");
    }
    if (!priority) {
      throw new ApiError(400, "priority is required");
    }
    if (!cause || (Array.isArray(cause) && cause.length === 0)) {
      throw new ApiError(400, "cause is required (array or string)");
    }

    const projects = await Project.find().lean();
    if (!projects.length) {
      throw new ApiError(503, "Project catalog is empty; run seed or check database");
    }

    const { recommendations, meta } = runRecommendationEngine(projects, {
      cause,
      budget: Number(budget),
      location: location || "",
      priority,
    });

    await RecommendationLog.create({
      userId: req.userId || null,
      filters: {
        cause: Array.isArray(cause) ? cause : [cause],
        budget: Number(budget),
        location: location || "",
        priority,
      },
      results: recommendations.map((r) => ({
        projectId: r.projectId,
        score: r.score,
        reason: r.reason,
        expectedImpact: r.expectedImpact,
      })),
    });

    res.json({ recommendations, meta });
  } catch (e) {
    next(e);
  }
}
