import express from "express";
const router = express.Router();
import { requireSignin, authMiddleware } from "../controllers/auth.js";
import { read, publicProfile, update, photo } from "../controllers/user.js";

router.get("/profile", requireSignin, authMiddleware, read);
router.get("/user/:username", publicProfile);
router.put("/user/update", requireSignin, authMiddleware, update);
router.get("/user/photo/:username", photo);

export default router;
