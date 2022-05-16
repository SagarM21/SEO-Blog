import express from "express";
const router = express.Router();
import { create } from "../controllers/blog.js";
import { requireSignin, adminMiddleware } from "../controllers/auth.js";

router.post("/blog", requireSignin, adminMiddleware, create);

export default router;
