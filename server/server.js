import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { buildRecommendations } from "./recommendLogic.js";

const PORT = Number(process.env.PORT) || 5000;
const FRONTEND = process.env.FRONTEND_URL || "*";

const app = express();
app.use(
  cors({
    origin: FRONTEND === "*" ? true : FRONTEND.split(",").map((s) => s.trim()),
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.type("text/plain; charset=utf-8").send("Donor360 API running 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "donor360-api", port: PORT });
});

app.post("/api/recommend", (req, res) => {
  try {
    const body = req.body || {};
    console.log("[Donor360 API] POST /api/recommend body:", JSON.stringify(body, null, 2));

    const causes = Array.isArray(body.causes) ? body.causes : [];
    const budget = Number(body.budget) ?? 0;
    const location = body.location ?? "";
    const priority = body.priority ?? "Maximum Reach";

    const data = buildRecommendations({ causes, budget, location, priority });
    const payload = { success: true, data };
    console.log("[Donor360 API] POST /api/recommend response:", JSON.stringify(payload, null, 2));
    res.json(payload);
  } catch (err) {
    console.error("[Donor360 API] POST /api/recommend error:", err);
    res.status(500).json({ success: false, error: err?.message || "Internal error" });
  }
});

app.post("/api/donate", (req, res) => {
  const body = req.body || {};
  console.log("[Donor360 API] POST /api/donate body:", JSON.stringify(body, null, 2));
  const amount = Math.max(0, Number(body.amount) || 0);
  const projectId = body.projectId || "demo";
  const title = body.title || "Selected program";
  const region = body.region || "—";
  const estimatedLivesImpacted = Math.max(1, Math.round((amount / 1000) * 22));
  const householdsTouched = Math.round(estimatedLivesImpacted / 4.2);
  const impactSummary = `A $${amount.toLocaleString()} simulated allocation to "${title}" (${region}) is modelled to support approximately ${estimatedLivesImpacted.toLocaleString()} beneficiary touchpoints (demo).`;

  const out = {
    project: { id: projectId, title, location: region },
    amountUsd: amount,
    estimatedLivesImpacted,
    householdsTouched,
    impactSummary,
    methodology: "Demo simulation only — not a payment or audited outcome.",
  };
  console.log("[Donor360 API] POST /api/donate response:", JSON.stringify(out, null, 2));
  res.json(out);
});

app.get("/api/dashboard", (req, res) => {
  const payload = {
    mode: "public-open-access",
    usingDemoBaseline: true,
    totals: {
      donationCount: 184,
      totalDonationsUsd: 128400,
      totalModelledBeneficiaryTouchpoints: 402000,
      fundingDistributedUsd: 128400,
      climateResilienceIndex: 82,
      livesImpacted: 402000,
    },
    donationHistory: [
      {
        _id: "demo-1",
        amountUsd: 5000,
        estimatedLivesImpacted: 12800,
        projectId: { title: "Climate Flood Resilience — Indus Basin", category: "Climate" },
      },
      {
        _id: "demo-2",
        amountUsd: 3200,
        estimatedLivesImpacted: 9100,
        projectId: { title: "Women Health Program — Punjab", category: "Women" },
      },
    ],
    recommendationActivity: [],
  };
  console.log("[Donor360 API] GET /api/dashboard response:", JSON.stringify(payload, null, 2));
  res.json(payload);
});

async function maybeConnectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("[Donor360 API] MONGODB_URI not set — running without MongoDB persistence.");
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log("[Donor360 API] MongoDB connected (ready for future features).");
  } catch (e) {
    console.warn("[Donor360 API] MongoDB connection skipped:", e?.message || e);
  }
}

maybeConnectMongo().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Donor360 API] Listening on http://0.0.0.0:${PORT}`);
  });
});
