// export time = (req, res) => {
// 	res.json({ time: Date().toString() });
// };

const time = (req, res) => {
	res.json({ time: Date().toString() });
};

export { time };
