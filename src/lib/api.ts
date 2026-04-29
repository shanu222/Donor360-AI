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

function getToken() {
  return localStorage.getItem("donor360_token");
}

async function parseJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { error: text || "Invalid JSON" };
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let body: BodyInit | undefined = init.body;
  if (init.json !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(init.json);
  }

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers, body });
  const data = await parseJson(res);
  if (!res.ok) {
    const msg = (data as { error?: string }).error || res.statusText || "Request failed";
    throw new Error(msg);
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

export function getDashboard() {
  return apiFetch<{
    totals: {
      donationCount: number;
      totalDonationsUsd: number;
      totalModelledBeneficiaryTouchpoints: number;
    };
    donationHistory: Array<{
      _id: string;
      amountUsd: number;
      estimatedLivesImpacted: number;
      projectId?: { title?: string };
    }>;
    recommendationActivity: unknown[];
    user: { name: string; email: string };
  }>("/api/dashboard");
}

export function postAuthLogin(email: string, password: string) {
  return apiFetch<{ token: string; user: { id: string; name: string; email: string } }>(
    "/api/auth/login",
    { method: "POST", json: { email, password } }
  );
}

export function postAuthRegister(name: string, email: string, password: string) {
  return apiFetch<{ token: string; user: { id: string; name: string; email: string } }>(
    "/api/auth/register",
    { method: "POST", json: { name, email, password } }
  );
}

export function postAuthFirebase(idToken: string) {
  return apiFetch<{ token: string; user: { id: string; name: string; email: string } }>(
    "/api/auth/firebase",
    { method: "POST", json: { idToken } }
  );
}

export function postToggleSaved(projectId: string) {
  return apiFetch<{ saved: boolean; savedProjectIds: string[] }>("/api/user/saved", {
    method: "POST",
    json: { projectId },
  });
}
