import express from "express";
const router = express.Router();
import { contactForm, contactBlogAuthorForm } from "../controllers/form.js";

// validators
import { contactFormValidator } from "../validators/form.js";
import { runValidation } from "../validators/index.js";

router.post("/contact", contactFormValidator, runValidation, contactForm);
router.post(
	"/contact-blog-author",
	contactFormValidator,
	runValidation,
	contactBlogAuthorForm
);

export default router;
