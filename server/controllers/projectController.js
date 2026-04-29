import { Project } from "../models/Project.js";

export async function listProjects(req, res, next) {
  try {
    const projects = await Project.find().sort({ impactScore: -1 }).lean();
    res.json({ count: projects.length, projects });
  } catch (e) {
    next(e);
  }
}
