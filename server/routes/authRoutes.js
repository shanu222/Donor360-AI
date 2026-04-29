import { Router } from "express";
import { register, login, firebaseSync, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.post("/register", register);
r.post("/login", login);
r.post("/firebase", firebaseSync);
r.get("/me", requireAuth, me);

export default r;
