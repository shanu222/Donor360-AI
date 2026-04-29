import { Router } from "express";
import authRoutes from "./authRoutes.js";
import projectRoutes from "./projectRoutes.js";
import recommendationRoutes from "./recommendationRoutes.js";
import donateRoutes from "./donateRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import userRoutes from "./userRoutes.js";

const api = Router();

api.use("/auth", authRoutes);
api.use("/projects", projectRoutes);
api.use("/recommendations", recommendationRoutes);
api.use("/donate", donateRoutes);
api.use("/dashboard", dashboardRoutes);
api.use("/user", userRoutes);

export default api;
