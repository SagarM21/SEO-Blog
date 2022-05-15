import express from "express";
import { adminMiddleware, requireSignin } from "../controllers/auth.js";
const router = express.Router();
import { create, list, read, remove } from "../controllers/tag.js";

// validators
import { tagCreateValidator } from "../validators/tag.js";
import { runValidation } from "../validators/index.js";

router.post(
	"/tag",
	tagCreateValidator,
	runValidation,
	requireSignin,
	adminMiddleware,
	create
);
router.get("/tags", list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", requireSignin, adminMiddleware, remove);

export default router;
