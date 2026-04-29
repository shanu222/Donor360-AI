import mongoose from "mongoose";
import { Project } from "../models/Project.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/apiError.js";

function simulateImpact(project, amountUsd) {
  const amount = Math.max(0, Number(amountUsd) || 0);
  const perK = project.impactPerThousandUsd ?? 15;
  const beneficiaries = project.beneficiaryEstimate ?? 1000;
  const estimatedLivesImpacted = Math.max(
    1,
    Math.round((amount / 1000) * perK * (1 + project.impactScore / 200))
  );
  const householdsTouched = Math.round(estimatedLivesImpacted / 4.2);
  const summary =
    `A $${amount.toLocaleString()} allocation to "${project.title}" is modelled to support ` +
    `approximately ${estimatedLivesImpacted.toLocaleString()} beneficiary touchpoints (methodology: ` +
    `impact-per-$1k × program quality factor), with roughly ${householdsTouched.toLocaleString()} ` +
    `household-equivalents across ${project.location}. Annual program reach baseline ~${beneficiaries.toLocaleString()}.`;

  return { estimatedLivesImpacted, householdsTouched, summary, impactPerThousandUsd: perK };
}

export async function donate(req, res, next) {
  try {
    const { projectId, amount } = req.body;
    if (!projectId) throw new ApiError(400, "projectId is required");
    if (amount === undefined || amount === null) throw new ApiError(400, "amount is required");
    const amt = Number(amount);
    if (Number.isNaN(amt) || amt <= 0) throw new ApiError(400, "amount must be a positive number");

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new ApiError(400, "Invalid projectId");
    }
    const project = await Project.findById(projectId).lean();
    if (!project) throw new ApiError(404, "Project not found");

    const metrics = simulateImpact(project, amt);

    if (req.userId) {
      await User.findByIdAndUpdate(req.userId, {
        $push: {
          donationHistory: {
            projectId: project._id,
            amountUsd: amt,
            estimatedLivesImpacted: metrics.estimatedLivesImpacted,
          },
        },
      });
    }

    res.json({
      project: { id: project._id, title: project.title, location: project.location },
      amountUsd: amt,
      estimatedLivesImpacted: metrics.estimatedLivesImpacted,
      householdsTouched: metrics.householdsTouched,
      impactSummary: metrics.summary,
      methodology:
        "Simulation uses program impact-per-$1k, impact score uplift, and household divisor 4.2; not audited financial advice.",
    });
  } catch (e) {
    next(e);
  }
}
