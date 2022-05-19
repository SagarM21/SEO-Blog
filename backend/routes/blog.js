import express from "express";
const router = express.Router();
import {
	create,
	list,
	listAllCategoriesTags,
	read,
	remove,
	update,
	photo,
	listRelated,
} from "../controllers/blog.js";
import { requireSignin, adminMiddleware } from "../controllers/auth.js";

router.post("/blog", requireSignin, adminMiddleware, create);
router.get("/blogs", list);
router.post("/blogs-categories-tags", listAllCategoriesTags);
router.get("/blog/:slug", read);
router.delete("/blog/:slug", requireSignin, adminMiddleware, remove);
router.put("/blog/:slug", requireSignin, adminMiddleware, update);
router.get("/blog/photo/:slug", photo);
router.post("/blogs/related", listRelated);

export default router;
