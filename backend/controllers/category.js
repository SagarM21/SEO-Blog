import Category from "../models/category.js";
import slugify from "slugify";
import { errorHandler } from "../helpers/dbErrorHandler.js";

export const create = (req, res) => {
	const { name } = req.body;
	let slug = slugify(name).toLowerCase();

	let category = new Category({ name, slug });

	category.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		res.json(data);
	});
};
