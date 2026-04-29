import { User } from "../models/User.js";
import { RecommendationLog } from "../models/RecommendationLog.js";
import { Project } from "../models/Project.js";

const DEMO_BASELINE = {
  totalDonationsUsd: 128_400,
  totalModelledBeneficiaryTouchpoints: 402_000,
  donationCount: 184,
  climateResilienceIndex: 82,
};

const SAMPLE_DONATIONS = [
  {
    _id: "demo-row-1",
    amountUsd: 5000,
    estimatedLivesImpacted: 12800,
    projectId: { title: "Indus Basin Community Early Warning", category: "Climate" },
  },
  {
    _id: "demo-row-2",
    amountUsd: 3200,
    estimatedLivesImpacted: 9100,
    projectId: { title: "She360 Maternal Health Hub — Lahore", category: "Women" },
  },
  {
    _id: "demo-row-3",
    amountUsd: 2400,
    estimatedLivesImpacted: 6700,
    projectId: { title: "Rural Punjab Girls' Secondary Completion", category: "Education" },
  },
  {
    _id: "demo-row-4",
    amountUsd: 1800,
    estimatedLivesImpacted: 5400,
    projectId: { title: "Tharparkar Household Water Safety", category: "Climate" },
  },
];

export async function dashboard(req, res, next) {
  try {
    const [totalsAgg] = await User.aggregate([
      { $unwind: { path: "$donationHistory", preserveNullAndEmptyArrays: false } },
      {
        $group: {
          _id: null,
          totalDonationsUsd: { $sum: "$donationHistory.amountUsd" },
          totalModelledBeneficiaryTouchpoints: { $sum: "$donationHistory.estimatedLivesImpacted" },
          donationCount: { $sum: 1 },
        },
      },
    ]);

    let totalDonationsUsd = totalsAgg?.totalDonationsUsd ?? 0;
    let totalModelledBeneficiaryTouchpoints = totalsAgg?.totalModelledBeneficiaryTouchpoints ?? 0;
    let donationCount = totalsAgg?.donationCount ?? 0;

    let usingDemoBaseline = false;
    if (!donationCount && !totalDonationsUsd) {
      usingDemoBaseline = true;
      totalDonationsUsd = DEMO_BASELINE.totalDonationsUsd;
      totalModelledBeneficiaryTouchpoints = DEMO_BASELINE.totalModelledBeneficiaryTouchpoints;
      donationCount = DEMO_BASELINE.donationCount;
    }

    const recentDonations = await User.aggregate([
      { $unwind: { path: "$donationHistory", preserveNullAndEmptyArrays: false } },
      { $sort: { "donationHistory.createdAt": -1 } },
      { $limit: 12 },
      {
        $lookup: {
          from: "projects",
          localField: "donationHistory.projectId",
          foreignField: "_id",
          as: "proj",
        },
      },
      { $addFields: { project: { $arrayElemAt: ["$proj", 0] } } },
      {
        $project: {
          _id: "$donationHistory._id",
          amountUsd: "$donationHistory.amountUsd",
          estimatedLivesImpacted: "$donationHistory.estimatedLivesImpacted",
          createdAt: "$donationHistory.createdAt",
          projectId: {
            title: "$project.title",
            category: "$project.category",
            location: "$project.location",
          },
        },
      },
    ]);

    let donationHistory = recentDonations;
    if (donationHistory.length === 0) {
      donationHistory = usingDemoBaseline ? SAMPLE_DONATIONS : [];
    }

    const recentLogs = await RecommendationLog.find()
      .sort({ createdAt: -1 })
      .limit(15)
      .select("filters results createdAt")
      .lean();

    const [climateAgg] = await Project.aggregate([
      { $match: { category: "Climate" } },
      { $group: { _id: null, avgImpact: { $avg: "$impactScore" } } },
    ]);
    const climateResilienceIndex = Math.round(climateAgg?.avgImpact ?? DEMO_BASELINE.climateResilienceIndex);

    res.json({
      mode: "public-open-access",
      usingDemoBaseline,
      totals: {
        donationCount,
        totalDonationsUsd: Math.round(totalDonationsUsd * 100) / 100,
        totalModelledBeneficiaryTouchpoints: Math.round(totalModelledBeneficiaryTouchpoints),
        fundingDistributedUsd: Math.round(totalDonationsUsd * 100) / 100,
        climateResilienceIndex,
        livesImpacted: Math.round(totalModelledBeneficiaryTouchpoints),
      },
      donationHistory,
      recommendationActivity: recentLogs,
    });
  } catch (e) {
    next(e);
  }
}
