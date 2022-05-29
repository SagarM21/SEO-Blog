import express from "express";
const router = express.Router();
import { contactForm } from "../controllers/form.js";

// validators
import { contactFormValidator } from "../validators/form.js";
import { runValidation } from "../validators/index.js";

router.post("/contact", contactFormValidator, runValidation, contactForm);

export default router;
