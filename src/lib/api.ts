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

export function postRecommendations(prefs: DonorPreferences) {
  return apiFetch<{ recommendations: RecommendationItem[]; meta: Record<string, unknown> }>(
    "/api/recommendations",
    {
      method: "POST",
      json: {
        cause: prefs.cause,
        budget: prefs.budget,
        location: prefs.location || "",
        priority: prefs.priority,
      },
    }
  );
}

export function postDonate(projectId: string, amount: number) {
  return apiFetch<{
    estimatedLivesImpacted: number;
    householdsTouched: number;
    impactSummary: string;
    amountUsd: number;
    project: { id: string; title: string; location: string };
  }>("/api/donate", {
    method: "POST",
    json: { projectId, amount },
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
  return apiFetch<DashboardPayload>("/api/dashboard");
}
