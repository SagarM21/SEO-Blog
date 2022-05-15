import User from "../models/user.js";

export const read = (req, res) => {
	req.profile.hashed_password = undefined;
	return res.json(req.profile);
};
