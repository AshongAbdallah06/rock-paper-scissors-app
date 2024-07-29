const jwt = require("jsonwebtoken");
const pool = require("../db");
const { v4: uuid } = require("uuid");

const getHome = async (req, res) => {};

const handleErrors = (err) => {
	const errors = { email: "", username: "" };

	if (err.message.includes("duplicate") && err.message.includes("email")) {
		errors.email = "Email already in use";
	}

	if (err.message.includes("duplicate") && err.message.includes("username")) {
		errors.username = "Username already exists";
	}

	return errors;
};

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

const signup = async (req, res) => {
	const id = uuid();
	const { email, username, password } = req.body;

	try {
		await pool.query(`INSERT INTO USERS VALUES ($1, $2, $3, $4)`, [
			id,
			username,
			email,
			password,
		]);

		const token = createToken(id);

		res.status(201).json({ email, id, username, token });
	} catch (err) {
		const error = handleErrors(err);

		res.status(401).json({ error });
	}
};

const login = async (req, res) => {
	try {
	} catch (error) {
		console.log("🚀 ~ login ~ error:", error);
	}
};

module.exports = { signup, getHome, login };
