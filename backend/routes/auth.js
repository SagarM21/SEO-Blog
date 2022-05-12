import express from "express";
const router = express.Router();
import { signup } from "../controllers/auth.js";

// validators
import { userSignupValidator } from "../validators/auth.js";
import { runValidation } from "../validators/index.js";

router.post("/signup", userSignupValidator, runValidation, signup);

export default router;
