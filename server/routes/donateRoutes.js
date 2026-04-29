import { Router } from "express";
import { donate } from "../controllers/donateController.js";
import { optionalAuth } from "../middleware/auth.js";

const r = Router();
r.post("/", optionalAuth, donate);

export default r;
