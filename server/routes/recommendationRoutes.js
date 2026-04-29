import { Router } from "express";
import { createRecommendations } from "../controllers/recommendationController.js";
import { optionalAuth } from "../middleware/auth.js";

const r = Router();
r.post("/", optionalAuth, createRecommendations);

export default r;
