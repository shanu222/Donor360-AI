import { Router } from "express";
import { toggleSavedProject } from "../controllers/userController.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.post("/saved", requireAuth, toggleSavedProject);

export default r;
