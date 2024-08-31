const pool = require("../db");

const getHome = async (req, res) => {
	const user_id = req.user;

	try {
		res.json({ user: user_id });
	} catch (error) {
		res.status(401).json({ msg: "Invalid Token. Access Unauthorized" });
	}
};

const getScores = async (req, res) => {
	try {
		console.log("🚀 ~ getScores ~ Fetching scores from database");
		const response = await pool.query("SELECT * FROM SCORES ORDER BY SCORE DESC");
		const scores = response.rows;
		console.log("🚀 ~ getScores ~ Success:", scores);

		res.status(201).json(scores);
	} catch (error) {
		console.error("🚀 ~ getScores ~ error:", error);
		res.status(500).json({ msg: "Error retrieving scores" });
	}
};

const getUserScore = async (req, res) => {
	try {
		console.log("🚀 ~ getScores ~ Fetching scores from database");
		const response = await pool.query("SELECT score FROM SCORES");
		const scores = response.rows;
		console.log("🚀 ~ getScores ~ Success:", scores);

		res.status(201).json(scores);
	} catch (error) {
		console.error("🚀 ~ getScores ~ error:", error);
		res.status(500).json({ msg: "Error retrieving scores" });
	}
};

const updateScores = async (req, res) => {
	const { username } = req.params;
	const { score } = req.body;

	try {
		const user = await pool.query(`SELECT * FROM SCORES WHERE USERNAME = $1`, [username]);

		if (!user.rows[0]?.username) {
			await pool.query(
				`INSERT INTO SCORES(username,score,wins,loses,ties,games_played) VALUES($1,$2,$3,$4,$5,$6)`,
				[username, 0, 0, 0, 0, 0]
			);
		} else {
			await pool.query(`UPDATE SCORES SET SCORE = $1 WHERE USERNAME = $2`, [score, username]);
		}
	} catch (error) {
		console.log("🚀 ~ getScores ~ error:", error);
	}
};

const getUserStats = async (req, res) => {
	const { username } = req.params;

	try {
		console.log(username);
		console.log("🚀 ~ getScores ~ Fetching scores from database");
		const response = await pool.query("SELECT * FROM SCORES WHERE USERNAME = $1", [username]);
		const scores = response.rows;
		console.log("🚀 ~ getScores ~ Success:", scores);

		res.status(201).json(scores);
	} catch (error) {
		console.log("🚀 ~ getUserStats ~ error:", error);
	}
};

module.exports = { getHome, getScores, updateScores, getUserStats, getUserScore };
