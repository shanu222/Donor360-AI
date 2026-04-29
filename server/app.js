import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import api from "./routes/index.js";
import { errorHandler, ApiError } from "./utils/apiError.js";
import { seedProjectsFromFile } from "./services/seedProjects.js";

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/donor360";

const origins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "donor360-api", time: new Date().toISOString() });
});

app.use("/api", api);

app.use((req, res, next) => {
  next(new ApiError(404, `Not found: ${req.method} ${req.path}`));
});

app.use(errorHandler);

async function start() {
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connected");
  await seedProjectsFromFile();
  app.listen(PORT, () => {
    console.log(`Donor360 API listening on :${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});

export default app;
