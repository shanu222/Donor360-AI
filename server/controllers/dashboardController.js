import { User } from "../models/User.js";
import { RecommendationLog } from "../models/RecommendationLog.js";
import { ApiError } from "../utils/apiError.js";

export async function dashboard(req, res, next) {
  try {
    if (!req.userId) throw new ApiError(401, "Authentication required");

    const user = await User.findById(req.userId)
      .populate("donationHistory.projectId", "title category location")
      .lean();
    if (!user) throw new ApiError(404, "User not found");

    const donations = user.donationHistory || [];
    const totalDonations = donations.reduce((s, d) => s + (d.amountUsd || 0), 0);
    const totalImpactUnits = donations.reduce((s, d) => s + (d.estimatedLivesImpacted || 0), 0);

    const recentLogs = await RecommendationLog.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(8)
      .select("filters results createdAt")
      .lean();

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        savedProjectsCount: (user.savedProjects || []).length,
      },
      totals: {
        donationCount: donations.length,
        totalDonationsUsd: Math.round(totalDonations * 100) / 100,
        totalModelledBeneficiaryTouchpoints: totalImpactUnits,
      },
      donationHistory: donations.slice(-15).reverse(),
      recommendationActivity: recentLogs,
    });
  } catch (e) {
    next(e);
  }
}
