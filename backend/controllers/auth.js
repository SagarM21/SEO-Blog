import User from "../models/user.js";
import shortId from "shortid";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import dotenv from "dotenv";
import { errorHandler } from "../helpers/dbErrorHandler.js";

export const signup = (req, res) => {
	User.findOne({ email: req.body.email }).exec((err, user) => {
		if (user) {
			return res.status(400).json({
				error: "Email is taken",
			});
		}

		const { name, email, password } = req.body;
		let username = shortId.generate();
		let profile = `${process.env.CLIENT_URL}/profile/${username}`;

		let newUser = new User({ name, email, password, profile, username });
		newUser.save((err, success) => {
			if (err) {
				return res.status(400).json({ error: "Could not signup user" });
			}

			// res.json({D
			// 	user: success,
			// });
			res.json({
				message: "Signup success! Please sign in.",
			});
		});
	});
};

export const signin = (req, res) => {
	const { email, password } = req.body;
	// check if user exists
	User.findOne({ email }).exec((err, user) => {
		if (err || !user) {
			return res
				.status(400)
				.json({ error: "User with that email does not exist. Please signup" });
		}

		// authenticate
		if (!user.authenticate(password)) {
			return res.status(400).json({ error: "Email and password do not match" });
		}

		// generate a jwt AND sent to client
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		res.cookie("token", token, { expiresIn: "1d" });
		const { _id, username, name, email, role } = user;
		return res.json({
			token,
			user: { _id, username, name, email, role },
		});
	});
};

export const signout = (req, res) => {
	res.clearCookie("token");
	res.json({
		message: "Signout success",
	});
};

dotenv.config();
export const requireSignin = expressJwt({
	secret: `${process.env.JWT_SECRET}`, // after adding dotenv stmt, it worked
	//secret: process.env.JWT_SECRET,
	//secret: "seoblogk09", // if i am hard coding the secret then its working fine
	algorithms: ["HS256"], // added later
	requestProperty: "user", // can be written as userProperty and requestProperty both, both are valid
});

export const authMiddleware = (req, res, next) => {
	const authUserId = req.user._id;
	//console.log(user);
	User.findById({ _id: authUserId }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		req.profile = user;
		next();
	});
};

export const adminMiddleware = (req, res, next) => {
	const adminUserId = req.user._id;
	//console.log(user)
	User.findById({ _id: adminUserId }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		if (user.role !== 1) {
			return res.status(400).json({
				error: "Admin resource. Access denied",
			});
		}
		req.profile = user;

		next();
	});
};

export const canUpdateDeleteBlog = (req, res, next) => {
	const slug = req.params.slug.toLowerCase();
	Blog.findOne({ slug }).exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}

		let authorizedUser =
			data.postedBy._id.toString() === req.profile._id.toString();
		if (!authorizedUser) {
			return res.status(400).json({
				error: "You are not authorized",
			});
		}
		next();
	});
};
