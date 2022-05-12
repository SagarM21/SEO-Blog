import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/auth.js";

// validators
import {
	userSignupValidator,
	userSigninValidator,
} from "../validators/auth.js";
import { runValidation } from "../validators/index.js";

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);

export default router;
