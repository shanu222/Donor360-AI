import { Router } from "express";
import { donate } from "../controllers/donateController.js";

const r = Router();
r.post("/", donate);

export default r;
