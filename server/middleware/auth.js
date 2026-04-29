import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../utils/apiError.js";

export function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    try {
      const decoded = verifyToken(header.slice(7));
      req.userId = decoded.sub;
    } catch {
      req.userId = null;
    }
  }
  next();
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(new ApiError(401, "Authentication required"));
  }
  try {
    const decoded = verifyToken(header.slice(7));
    req.userId = decoded.sub;
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
}
