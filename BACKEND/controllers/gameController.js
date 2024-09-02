const pool = require("../db");

const getHome = async (req, res) => {
	const user_id = req.user;

	try {
		res.json({ user: user_id });
	} catch (error) {
		res.status(401).json({ msg: "Invalid Token. Access Unauthorized" });
	}
};

const getUserStats = async (req, res) => {
	const { username } = req.params;

	try {
		const response = await pool.query("SELECT * FROM SCORES WHERE USERNAME = $1", [username]);
		const scores = response.rows;

		res.status(201).json(scores);
	} catch (error) {
		console.log("🚀 ~ getUserStats ~ error:", error);
	}
};

module.exports = { getHome, getUserStats };
