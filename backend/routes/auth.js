import express from "express";
const router = express.Router();
import {
	signup,
	signin,
	signout,
	requireSignin,
	forgotPassword,
	resetPassword,
} from "../controllers/auth.js";

// validators
import {
	userSignupValidator,
	userSigninValidator,
	forgotPasswordValidator,
	resetPasswordValidator,
} from "../validators/auth.js";
import { runValidation } from "../validators/index.js";

// two ways of writing the route command

// router.post("/signup", userSignupValidator, runValidation, signup);
router.route("/signup").post(userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);
router.put(
	"/forgot-password",
	forgotPasswordValidator,
	runValidation,
	forgotPassword
);
router.put(
	"/reset-password",
	resetPasswordValidator,
	runValidation,
	resetPassword
);

// test
// router.get("/secret", requireSignin, (req, res) => {
// 	res.json({
// 		message: "Successfully accessed",
// 	});
// });

router.route("/secret").get(requireSignin, (req, res) => {
	res.json({
		user: req.auth,
	});
});

export default router;
