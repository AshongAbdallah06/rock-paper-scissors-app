const pool = require("../db");

const getHome = async (req, res) => {
	const user_id = req.user;
	const { username } = req.params;

	try {
		const userScoreDetails = await pool.query("SELECT * FROM SCORES WHERE USERNAME = $1", [
			username,
		]);
		const userInfoDetails = await pool.query("SELECT * FROM USERS WHERE USERNAME = $1", [
			username,
		]);

		if (userScoreDetails.rowCount > 0 && userInfoDetails.rowCount > 0)
			res.status(201).json({ msg: "ok" });
	} catch (error) {
		res.status(401).json(error);
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
