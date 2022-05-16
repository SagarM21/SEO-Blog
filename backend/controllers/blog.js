import Blog from "../models/blog.js";
import Category from "../models/category.js";
import Tag from "../models/tags.js";
import formidable from "formidable";
import slugify from "slugify";
import { stripHtml } from "string-strip-html";
import _ from "lodash";
import { errorHandler } from "../helpers/dbErrorHandler.js";
import fs from "fs";

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

		let blog = new Blog();
		blog.title = title;
		blog.body = body;
		blog.slug = slugify(title).toLowerCase();
		blog.mtitle = `${title} | ${process.env.APP_NAME}`;
		blog.mdesc = stripHtml(body.substring(0, 160)).result; // gives out only text
		blog.postedBy = req.user._id;

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
			res.json(result);
		});
	});
};
