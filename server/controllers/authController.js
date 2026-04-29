import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { ApiError } from "../utils/apiError.js";
import { verifyFirebaseIdToken, isFirebaseConfigured } from "../services/firebaseAuth.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new ApiError(400, "Name, email, and password are required");
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) throw new ApiError(409, "Email already registered");
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email: email.toLowerCase(), passwordHash });
    const token = signToken({ sub: user._id.toString(), email: user.email });
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new ApiError(400, "Email and password are required");
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.passwordHash) throw new ApiError(401, "Invalid credentials");
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new ApiError(401, "Invalid credentials");
    const token = signToken({ sub: user._id.toString(), email: user.email });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (e) {
    next(e);
  }
}

export async function firebaseSync(req, res, next) {
  try {
    if (!isFirebaseConfigured()) {
      throw new ApiError(503, "Firebase Admin is not configured on this server");
    }
    const { idToken } = req.body;
    if (!idToken) throw new ApiError(400, "idToken is required");
    const decoded = await verifyFirebaseIdToken(idToken);
    const email = decoded.email?.toLowerCase();
    if (!email) throw new ApiError(400, "Firebase token must include email");

    let user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      user = await User.findOne({ email });
    }
    if (!user) {
      user = await User.create({
        name: decoded.name || email.split("@")[0],
        email,
        firebaseUid: decoded.uid,
        passwordHash: null,
      });
    } else {
      user.firebaseUid = decoded.uid;
      await user.save();
    }
    const token = signToken({ sub: user._id.toString(), email: user.email });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (e) {
    next(e);
  }
}

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");
    if (!user) throw new ApiError(404, "User not found");
    res.json({ user });
  } catch (e) {
    next(e);
  }
}
