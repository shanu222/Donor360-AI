/**
 * Donor360 AI recommendation scoring.
 * score = impactScore * 0.5 + priorityBased * 0.3 + budgetCompatibility * 0.2
 */

const PRIORITY_LABELS = {
  "Maximum Reach": "scaleScore (program reach)",
  "Urgent Needs": "urgencyScore (time-sensitive need)",
  "Long-Term Impact": "impactScore (sustained outcomes)",
};

function budgetCompatibility(budget, minBudget) {
  if (!minBudget || minBudget <= 0) return 100;
  const ratio = budget / minBudget;
  return Math.min(100, Math.max(0, ratio * 100));
}

function priorityComponent(project, priority) {
  switch (priority) {
    case "Maximum Reach":
      return project.scaleScore;
    case "Urgent Needs":
      return project.urgencyScore;
    case "Long-Term Impact":
      return project.impactScore;
    default:
      return project.impactScore;
  }
}

export function computeScore(project, { budget, priority }) {
  const impact = Number(project.impactScore) || 0;
  const priorityBased = priorityComponent(project, priority);
  const budgetScore = budgetCompatibility(Number(budget) || 0, Number(project.minBudget) || 0);
  const raw = impact * 0.5 + priorityBased * 0.3 + budgetScore * 0.2;
  return Math.round(raw * 10) / 10;
}

function buildReason(project, priority, budget, score) {
  const priorityKey = PRIORITY_LABELS[priority] || "balanced signals";
  const budgetNote =
    budget >= project.minBudget
      ? "Your budget meets or exceeds the program entry threshold, improving deployability."
      : "Budget is below stated minimum; score reflects partial feasibility and staged funding pathways.";

  return (
    `Ranked using Donor360 composite: 50% impact quality, 30% ${priorityKey}, 20% budget fit. ` +
    `${budgetNote} Data source: ${project.dataSource}. Location: ${project.location}.`
  );
}

function expectedImpactLine(project, score) {
  const reach = project.beneficiaryEstimate ?? 0;
  const perK = project.impactPerThousandUsd ?? 15;
  return (
    `Composite ${score}/100. Estimated annual reach ~${reach.toLocaleString()} people; ` +
    `modelled ~${perK} lives touched per $1,000 at full funding (indicative).`
  );
}

const CAUSE_TO_CATEGORY = {
  women: "Women",
  climate: "Climate",
  healthcare: "Health",
  education: "Education",
};

export function normalizeCauses(cause) {
  if (!cause) return [];
  const list = Array.isArray(cause) ? cause : String(cause).split(",").map((s) => s.trim());
  const categories = new Set();
  for (const c of list) {
    const key = String(c).toLowerCase();
    if (CAUSE_TO_CATEGORY[key]) categories.add(CAUSE_TO_CATEGORY[key]);
  }
  return [...categories];
}

export function filterProjects(projects, { categories, location, budget }) {
  let list = [...projects];

  if (categories.length > 0) {
    list = list.filter((p) => categories.includes(p.category));
  }

  if (location && String(location).trim()) {
    const q = String(location).trim().toLowerCase();
    list = list.filter((p) => String(p.location).toLowerCase().includes(q));
  }

  return list;
}

/**
 * @param {Array} projects - Mongoose docs or plain objects with required fields
 * @param {{ cause: string|string[], budget: number, location?: string, priority: string }} filters
 * @returns {{ recommendations: Array, meta: object }}
 */
export function runRecommendationEngine(projects, filters) {
  const categories = normalizeCauses(filters.cause);
  const budget = Number(filters.budget) || 0;
  const location = filters.location || "";
  const priority = filters.priority || "Long-Term Impact";

  let pool = filterProjects(projects, { categories, location, budget });
  if (pool.length === 0) {
    pool = filterProjects(projects, { categories, location: "", budget });
  }
  if (pool.length === 0) {
    pool = filterProjects(projects, { categories: [], location: "", budget });
  }

  const scored = pool.map((p) => {
    const plain = p.toObject ? p.toObject() : p;
    const score = computeScore(plain, { budget, priority });
    return {
      project: plain,
      score,
      reason: buildReason(plain, priority, budget, score),
      expectedImpact: expectedImpactLine(plain, score),
    };
  });

  scored.sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return {
      recommendations: [],
      meta: {
        filtersUsed: { categories, budget, location, priority },
        note: "No projects in catalog.",
      },
    };
  }

  const take = scored.length >= 3 ? Math.min(5, scored.length) : scored.length;
  const finalTop = scored.slice(0, take);

  return {
    recommendations: finalTop.map((row, i) => ({
      rank: i + 1,
      projectId: row.project._id,
      slug: row.project.slug,
      title: row.project.title,
      category: row.project.category,
      location: row.project.location,
      dataSource: row.project.dataSource,
      score: row.score,
      reason: row.reason,
      expectedImpact: row.expectedImpact,
      impactScore: row.project.impactScore,
      urgencyScore: row.project.urgencyScore,
      scaleScore: row.project.scaleScore,
      minBudget: row.project.minBudget,
      description: row.project.description,
      isBestMatch: i === 0,
    })),
    meta: {
      filtersUsed: { categories, budget, location, priority },
      evaluatedCount: scored.length,
    },
  };
}
