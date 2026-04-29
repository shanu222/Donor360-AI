import { Router } from "express";
import { createRecommendations } from "../controllers/recommendationController.js";

const r = Router();
r.post("/", createRecommendations);

export default r;
