import express from "express";
import { adminMiddleware, requireSignin } from "../controllers/auth.js";
const router = express.Router();
import { create } from "../controllers/category.js";

// validators
import { categoryCreateValidator } from "../validators/category.js";
import { runValidation } from "../validators/index.js";

router.post(
	"/category",
	categoryCreateValidator,
	runValidation,
	requireSignin,
	adminMiddleware,
	create
);

export default router;
