import express from "express";
import { adminMiddleware, requireSignin } from "../controllers/auth.js";
const router = express.Router();
import { create, list, read, remove } from "../controllers/category.js";

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
router.get("/categories", list);
router.get("/category/:slug", read);
router.delete("/category/:slug", requireSignin, adminMiddleware, remove);

export default router;
