import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			max: 160,
			min: 3,
		},
		slug: {
			type: String,
			unique: true,
			index: true,
		},
		body: {
			type: {}, // empty object means store any kind of data
			min: 200,
			max: 2000000,
		},
		excerpt: {
			// starting lines of blog
			type: String,
			max: 1000,
		},
		mtitle: {
			type: String,
		},
		mdesc: {
			type: String,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		categories: [
			{
				type: ObjectId,
				ref: "Category",
				required: true,
			},
		],
		tags: [
			{
				ref: "Tag",
				type: ObjectId,
				required: true,
			},
		],

		postedBy: {
			type: ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
