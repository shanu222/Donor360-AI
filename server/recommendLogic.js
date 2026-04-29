import {
  she360WomenPrograms,
  resilience360ClimatePrograms,
  crossCutPrograms,
} from "../src/data/mockData.js";

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function priorityDelta(priority) {
  if (priority === "Maximum Reach") return 4;
  if (priority === "Urgent Needs") return 6;
  if (priority === "Long-Term Impact") return 2;
  return 2;
}

function budgetDelta(budget) {
  const b = Number(budget) || 0;
  if (b >= 5000) return 3;
  if (b >= 2000) return 1;
  return 0;
}

function locationMatch(row, location) {
  if (!location || !String(location).trim()) return true;
  const q = String(location).trim().toLowerCase();
  return String(row.region).toLowerCase().includes(q) || String(row.title).toLowerCase().includes(q);
}

/**
 * Build ranked recommendations from mock She360 + Resilience360 pools.
 * @returns {Array<{ title: string, impactScore: number, region: string, description: string, sdg: string }>}
 */
export function buildRecommendations({ causes, budget, location, priority }) {
  const tags = new Set((causes || []).map((c) => String(c).toLowerCase()));

  let pool = [];

  const wantWomen = tags.has("women") || tags.has("healthcare") || tags.has("education");
  const wantClimate = tags.has("climate");

  if (wantWomen) {
    pool.push(...she360WomenPrograms);
    pool.push(...crossCutPrograms);
  }
  if (wantClimate) {
    pool.push(...resilience360ClimatePrograms);
  }

  if (pool.length === 0) {
    pool = [...she360WomenPrograms, ...resilience360ClimatePrograms, ...crossCutPrograms];
  }

  const dedupe = new Map();
  for (const row of pool) {
    const key = slugify(row.title);
    if (!dedupe.has(key)) dedupe.set(key, row);
  }
  pool = [...dedupe.values()];

  let filtered = pool.filter((row) => locationMatch(row, location));
  if (filtered.length === 0) filtered = pool;

  const scored = filtered.map((row) => {
    const impactScore = Math.min(
      100,
      Math.round(row.baseImpact + priorityDelta(priority) + budgetDelta(budget))
    );
    return {
      title: row.title,
      impactScore,
      region: row.region,
      description: row.description,
      sdg: row.sdg,
      _tags: row.tags,
    };
  });

  scored.sort((a, b) => b.impactScore - a.impactScore);

  const top = scored.slice(0, 3).map(({ _tags, ...rest }) => rest);
  return top;
}
