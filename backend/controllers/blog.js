import Blog from "../models/blog.js";
import Category from "../models/category.js";
import Tag from "../models/tags.js";
import formidable from "formidable";
import slugify from "slugify";
import { stripHtml } from "string-strip-html";
import _ from "lodash";
import { errorHandler } from "../helpers/dbErrorHandler.js";
import fs from "fs";
import { smartTrim } from "../helpers/blog.js";

export const create = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: "Image could not upload",
			});
		}

		const { title, body, categories, tags } = fields;

		// this code is showing title is required always - idk

		if (!title || title.length) {
			return res.status(400).json({
				error: "Title is required",
			});
		}

		if (!body || body.length < 200) {
			return res.status(400).json({
				error: "Content is too short",
			});
		}

		if (!categories || categories.length === 0) {
			return res.status(400).json({
				error: "At least one category is required",
			});
		}

		if (!tags || tags.length === 0) {
			return res.status(400).json({
				error: "At least one tag is required",
			});
		}

		let blog = new Blog();
		blog.title = title;
		blog.body = body;
		//blog.excerpt = smartTrim(body, 160, " ", " ...");
		blog.slug = slugify(title).toLowerCase();
		blog.mtitle = `${title} | ${process.env.APP_NAME}`;
		//blog.mdesc = stripHtml(body.substring(0, 160)).result; // gives out only text
		blog.postedBy = req.user._id;

		// categories and tags
		let arrayOfCategories = categories && categories.split(",");
		let arrayOfTags = tags && tags.split(",");

		if (files.photo) {
			if (files.photo.size > 10000000) {
				return res.status(400).json({
					error: "Image should be less then 1mb in size",
				});
			}
			blog.photo.data = fs.readFileSync(files.photo.filepath, "utf-8");
			blog.photo.contentType = files.photo.type;
		}

		blog.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}
			//res.json(result);
			Blog.findByIdAndUpdate(
				result._id,
				{ $push: { categories: arrayOfCategories } },
				{ new: true }
			).exec((err, result) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err),
					});
				} else {
					Blog.findByIdAndUpdate(
						result._id,
						{ $push: { tags: arrayOfTags } },
						{ new: true }
					).exec((err, result) => {
						if (err) {
							return res.status(400).json({
								error: errorHandler(err),
							});
						} else {
							res.json(result);
						}
					});
				}
			});
		});
	});
};

export const list = (req, res) => {
	Blog.find({})
		.populate("categories", "_id name slug")
		.populate("tags", "_id name slug")
		.populate("postedBy", "_id name username")
		.select(
			"_id title slug excerpt categories tags postedBy createdAt updatedAt"
		)
		.exec((err, data) => {
			if (err) {
				return res.json({
					error: errorHandler(err),
				});
			}
			res.json(data);
		});
};

export const listAllCategoriesTags = (req, res) => {
	let limit = req.body.limit ? parseInt(req.body.limit) : 10;
	let skip = req.body.skip ? parseInt(req.body.skip) : 0;

	let blogs;
	let categories;
	let tags;

	Blog.find({})
		.populate("categories", "_id name slug")
		.populate("tags", "_id name slug")
		.populate("postedBy", "_id name username profile")
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit)
		.select(
			"_id title slug excerpt categories tags postedBy createdAt updatedAt"
		)
		.exec((err, data) => {
			if (err) {
				return res.json({
					error: errorHandler(err),
				});
			}
			blogs = data; // blogs
			// get all categories
			Category.find({}).exec((err, c) => {
				if (err) {
					return res.json({
						error: errorHandler(err),
					});
				}
				categories = c; // categories

				// get all tags
				Tag.find({}).exec((err, t) => {
					if (err) {
						return res.json({
							error: errorHandler(err),
						});
					}

					tags = t; // tags

					// return all blogs categories tags
					res.json({ blogs, categories, tags, size: blogs.length });
				});
			});
		});
};

export const read = (req, res) => {};

export const update = (req, res) => {};

export const remove = (req, res) => {};
