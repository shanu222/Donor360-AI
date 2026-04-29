import { Router } from "express";
import projectRoutes from "./projectRoutes.js";
import recommendationRoutes from "./recommendationRoutes.js";
import donateRoutes from "./donateRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";

const api = Router();

api.use("/projects", projectRoutes);
api.use("/recommendations", recommendationRoutes);
api.use("/donate", donateRoutes);
api.use("/dashboard", dashboardRoutes);

export default api;
