import { User } from "../models/User.js";
import { Project } from "../models/Project.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";

export async function toggleSavedProject(req, res, next) {
  try {
    const { projectId } = req.body;
    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      throw new ApiError(400, "Valid projectId is required");
    }
    const exists = await Project.exists({ _id: projectId });
    if (!exists) throw new ApiError(404, "Project not found");

    const user = await User.findById(req.userId);
    if (!user) throw new ApiError(404, "User not found");

    const idStr = String(projectId);
    const has = user.savedProjects.some((id) => String(id) === idStr);
    if (has) {
      user.savedProjects = user.savedProjects.filter((id) => String(id) !== idStr);
    } else {
      user.savedProjects.push(projectId);
    }
    await user.save();
    res.json({ saved: !has, savedProjectIds: user.savedProjects });
  } catch (e) {
    next(e);
  }
}
