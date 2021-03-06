import Tag from "../models/tags.js";
import Blog from "../models/blog.js";
import slugify from "slugify";
import { errorHandler } from "../helpers/dbErrorHandler.js";

export const create = (req, res) => {
	const { name } = req.body;
	let slug = slugify(name).toLowerCase();

	let category = new Tag({ name, slug });

	category.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		res.json(data);
	});
};

export const list = (req, res) => {
	Tag.find({}).exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		res.json(data);
	});
};

export const remove = (req, res) => {
	const slug = req.params.slug.toLowerCase();
	Tag.findOneAndRemove({ slug }).exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		res.json({
			message: "Tag deleted successfully!",
		});
	});
};

export const read = (req, res) => {
	const slug = req.params.slug.toLowerCase();
	Tag.findOne({ slug }).exec((err, tag) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		//res.json(tag);
		Blog.find({ tags: tag })
			.populate("categories", "_id name slug")
			.populate("tags", "_id name slug")
			.populate("postedBy", "_id name")
			.select(
				"_id title slug excerpt categories postedBy tags createdAt updatedAt"
			)
			.exec((err, data) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err),
					});
				}
				res.json({ tag: tag, blogs: data }); // now in frontend use them like data.category or data.blogs
			});
	});
};
