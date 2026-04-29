const API_BASE = import.meta.env.VITE_API_URL ?? "";

export type DonorPreferences = {
  cause: string[];
  budget: number;
  location: string;
  priority: string;
};

export type RecommendationItem = {
  rank: number;
  projectId: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  dataSource: string;
  score: number;
  reason: string;
  expectedImpact: string;
  impactScore: number;
  urgencyScore: number;
  scaleScore: number;
  minBudget: number;
  description: string;
  isBestMatch: boolean;
  sdg?: string;
};

export type RecommendApiRow = {
  title: string;
  impactScore: number;
  region: string;
  description: string;
  sdg: string;
};

async function parseJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { error: text || "Invalid response from server" };
  }
}

function friendlyErrorMessage(res: Response, data: { error?: string }) {
  if (data.error && typeof data.error === "string" && data.error !== "Request failed") {
    return data.error;
  }
  if (res.status === 0 || res.status >= 500) {
    return "The service is temporarily unavailable. Please try again in a moment.";
  }
  if (res.status === 404) {
    return "That resource was not found.";
  }
  return "We could not complete this request. Check your connection and try again.";
}

function slugify(s: string) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function inferCategory(sdg: string) {
  if (sdg.includes("13") || sdg.includes("6") || sdg.includes("14")) return "Climate";
  if (sdg.includes("3")) return "Health";
  if (sdg.includes("4")) return "Education";
  if (sdg.includes("5")) return "Women";
  if (sdg.includes("2")) return "Health";
  return "Impact";
}

function inferDataSource(sdg: string) {
  if (sdg.includes("13") || sdg.includes("6") || sdg.includes("14")) return "Resilience360";
  return "She360";
}

export function mapRecommendRowsToItems(rows: RecommendApiRow[], priority: string): RecommendationItem[] {
  return rows.map((row, i) => {
    const slug = slugify(row.title) || `match-${i}`;
    const category = inferCategory(row.sdg);
    const dataSource = inferDataSource(row.sdg);
    return {
      rank: i + 1,
      projectId: `proj-${slug}`,
      slug,
      title: row.title,
      category,
      location: row.region,
      dataSource,
      score: row.impactScore,
      reason: `Ranked for "${priority}" using merged She360 + Resilience360 mock signals, budget fit, and regional match.`,
      expectedImpact: `${row.sdg} alignment — indicative model output for demo and diligence conversations.`,
      impactScore: row.impactScore,
      urgencyScore: Math.min(100, row.impactScore + 4),
      scaleScore: Math.max(0, row.impactScore - 6),
      minBudget: Math.max(250, Math.round(Math.min(5000, row.impactScore * 40))),
      description: row.description,
      isBestMatch: i === 0,
      sdg: row.sdg,
    };
  });
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };

  let body: BodyInit | undefined = init.body;
  if (init.json !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(init.json);
  }

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers, body });
  const data = await parseJson(res);
  if (!res.ok) {
    throw new Error(friendlyErrorMessage(res, data as { error?: string }));
  }
  return data as T;
}

/** POST /api/recommend — EC2: set VITE_API_URL to http://<host>:5000 */
export async function postRecommend(prefs: DonorPreferences): Promise<RecommendationItem[]> {
  const payload = {
    causes: prefs.cause,
    budget: prefs.budget,
    location: prefs.location || "",
    priority: prefs.priority,
  };

  const res = await fetch(`${API_BASE}/api/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const raw = await parseJson(res);
  console.log("[Donor360 UI] POST /api/recommend response:", raw);

  if (!res.ok) {
    throw new Error(friendlyErrorMessage(res, raw as { error?: string }));
  }

  const body = raw as { success?: boolean; data?: RecommendApiRow[]; error?: string };
  if (!body.success || !Array.isArray(body.data)) {
    throw new Error(body.error || "Unexpected response from recommendation service.");
  }

  return mapRecommendRowsToItems(body.data, prefs.priority);
}

export function postDonate(
  projectId: string,
  amount: number,
  meta?: { title?: string; region?: string }
) {
  return apiFetch<{
    estimatedLivesImpacted: number;
    householdsTouched: number;
    impactSummary: string;
    amountUsd: number;
    project: { id: string; title: string; location: string };
  }>("/api/donate", {
    method: "POST",
    json: { projectId, amount, title: meta?.title, region: meta?.region },
  }).then((d) => {
    console.log("[Donor360 UI] POST /api/donate response:", d);
    return d;
  });
}

export type DashboardPayload = {
  mode: string;
  usingDemoBaseline: boolean;
  totals: {
    donationCount: number;
    totalDonationsUsd: number;
    totalModelledBeneficiaryTouchpoints: number;
    fundingDistributedUsd: number;
    climateResilienceIndex: number;
    livesImpacted: number;
  };
  donationHistory: Array<{
    _id: string;
    amountUsd: number;
    estimatedLivesImpacted: number;
    projectId?: { title?: string; category?: string };
  }>;
  recommendationActivity: unknown[];
};

export function getDashboard() {
  return apiFetch<DashboardPayload>("/api/dashboard").then((d) => {
    console.log("[Donor360 UI] GET /api/dashboard response:", d);
    return d;
  });
}
