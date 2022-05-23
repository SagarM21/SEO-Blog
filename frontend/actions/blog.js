import fetch from "isomorphic-fetch";
import { API } from "../config";
import { isAuth } from "./auth";
import queryString from "query-string";

export const createBlog = (blog, token) => {
	let createBlogEndpoint;

	if (isAuth() && isAuth().role === 1) {
		createBlogEndpoint = `${API}/blog`;
	} else if (isAuth() && isAuth().role === 0) {
		createBlogEndpoint = `${API}/user/blog`;
	}

	return fetch(`${createBlogEndpoint}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: blog,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
	const data = {
		limit,
		skip,
	};
	return fetch(`${API}/blogs-categories-tags`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const singleBlog = async (slug) => {
	try {
		const response = await fetch(`${API}/blog/${slug}`, {
			method: "GET",
		});
		return await response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const listRelated = (blog) => {
	return fetch(`${API}/blogs/related`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(blog),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const list = async (slug) => {
	try {
		const response = await fetch(`${API}/blogs`, {
			method: "GET",
		});
		return await response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const removeBlog = (slug, token) => {
	return fetch(`${API}/blog/${slug}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
	return fetch(`${API}/blog/${slug}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: blog,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const listSearch = (params) => {
	console.log("search params", params);
	let query = queryString.stringify(params);
	console.log("Query params", query);
	return fetch(`${API}/blogs/search?${query}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
