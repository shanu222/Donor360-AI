import { Router } from "express";
import { listProjects } from "../controllers/projectController.js";

const r = Router();
r.get("/", listProjects);

export default r;
