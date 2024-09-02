const jwt = require("jsonwebtoken");
const pool = require("../db");
const { v4: uuid } = require("uuid");
const { genSalt, hash, compare } = require("bcrypt");

const handleErrors = (err) => {
	const errors = { email: "", username: "", password: "" };

	if (err.message.includes("duplicate") && err.message.includes("email")) {
		errors.email = "Email already in use";
	}

	if (err.message.includes("duplicate") && err.message.includes("username")) {
		errors.username = "Username already exists";
	}

	if (err.message === "email error") {
		errors.email = "Email not registered";
	} else if (err.message === "password error") {
		errors.password = "Incorrect Password";
	}

	return errors;
};

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

const signup = async (req, res) => {
	const id = uuid();
	const { email, username, password } = req.body;
	const salt = await genSalt(10);
	const hashedPassword = await hash(password, salt);

	try {
		const lowercasedEmail = email.trim().toLowerCase();

		await pool.query(`INSERT INTO USERS VALUES ($1, $2, $3, $4)`, [
			id,
			username,
			lowercasedEmail,
			hashedPassword,
		]);

		const userExist = await pool.query(`SELECT * FROM SCORES WHERE USERNAME = $1`, [username]);
		if (userExist.rowCount < 1) {
			await pool.query(
				`INSERT INTO SCORES(username, wins, loses, ties, games_played) VALUES ($1, $2, $3, $4, $5)`,
				[username, 0, 0, 0, 0]
			);
		}

		const token = createToken(id);

		res.status(201).json({ lowercasedEmail, username, token });
	} catch (err) {
		const error = handleErrors(err);

		console.log(err);
		res.status(401).json({ error });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Convert email to lowercase before querying
		const lowercasedEmail = email.trim().toLowerCase();

		const userResult = await pool.query(
			`SELECT ID, EMAIL, PASSWORD, USERNAME FROM USERS WHERE LOWER(EMAIL) = $1`,
			[lowercasedEmail]
		);

		if (userResult.rowCount === 0) {
			throw new Error("email error");
		}

		const user = userResult.rows[0];

		const isPasswordValid = await compare(password, user.password);

		if (!isPasswordValid) {
			throw new Error("password error");
		}

		const token = createToken(user.id);

		return res.status(200).json({ email: user.email, username: user.username, token });
	} catch (err) {
		const error = handleErrors(err);
		console.error("Login error: ", err.message);
		return res.status(401).json({ error });
	}
};

module.exports = { signup, login };
