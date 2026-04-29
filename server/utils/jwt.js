import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "donor360-dev-change-in-production";

export function signToken(payload, expiresIn = "7d") {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
