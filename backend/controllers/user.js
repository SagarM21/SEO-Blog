import User from "../models/user.js";
import Blog from "../models/blog.js";
import { errorHandler } from "../helpers/dbErrorHandler.js";

export const read = (req, res) => {
	req.profile.hashed_password = undefined;
	return res.json(req.profile);
};

export const publicProfile = (req, res) => {
	let username = req.params.username;
	let user;
	let blogs;
	User.findOne({ username }).exec((err, userFromDB) => {
		if (err || !userFromDB) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		user = userFromDB;
		let userId = user._id;
		Blog.find({ postedBy: userId })
			.populate("categories", "_id name slug")
			.populate("tags", "_id name slug")
			.populate("postedBy", "_id name")
			.limit(10)
			.select(
				"_id title slug excerpt categories tags postedBy createdAt updatedAt"
			)
			.exec((err, data) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err),
					});
				}
				user.photo = undefined;
				user.hashed_password = undefined;
				res.json({
					user,
					blogs: data,
				});
			});
	});
};
