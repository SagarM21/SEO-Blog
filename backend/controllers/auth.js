import User from "../models/user.js";
import shortId from "shortid";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

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

			// res.json({
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

export const requireSignin = expressJwt({
	secret: `${process.env.JWT_SECRET}`,
	algorithms: ["HS256"], // added later
	userProperty: "auth",
});
