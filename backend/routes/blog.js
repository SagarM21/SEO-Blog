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
	listSearch,
} from "../controllers/blog.js";
import {
	requireSignin,
	adminMiddleware,
	authMiddleware,
} from "../controllers/auth.js";

router.post("/blog", requireSignin, adminMiddleware, create);
router.get("/blogs", list);
router.post("/blogs-categories-tags", listAllCategoriesTags);
router.get("/blog/:slug", read);
router.delete("/blog/:slug", requireSignin, adminMiddleware, remove);
router.put("/blog/:slug", requireSignin, adminMiddleware, update);
router.get("/blog/photo/:slug", photo);
router.post("/blogs/related", listRelated);
router.get("/blogs/search", listSearch);

// auth user blog crud
router.post("/user/blog", requireSignin, authMiddleware, create);
router.delete("/user/blog/:slug", requireSignin, authMiddleware, remove);
router.put("/user/blog/:slug", requireSignin, authMiddleware, update);

export default router;
