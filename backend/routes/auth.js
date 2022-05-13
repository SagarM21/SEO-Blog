import express from "express";
const router = express.Router();
import { signup, signin, signout, requireSignin } from "../controllers/auth.js";

// validators
import {
	userSignupValidator,
	userSigninValidator,
} from "../validators/auth.js";
import { runValidation } from "../validators/index.js";

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);

// test
router.get("/secret", requireSignin, (req, res) => {
	res.json({
		message: "You have access to secret page",
	});
});

export default router;
