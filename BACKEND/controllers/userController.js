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
		await pool.query(`INSERT INTO USERS VALUES ($1, $2, $3, $4)`, [
			id,
			username,
			email,
			hashedPassword,
		]);

		const userExist = await pool.query(`SELECT * FROM USERS WHERE USERNAME = $1`, [username]);
		if (userExist.rowCount < 1) {
			await pool.query(
				`INSERT INTO SCORES(username, score, wins, loses, ties, games_played) VALUES ($1, $2, $3, $4, $5, $6)`,
				[username, 0, 0, 0, 0, 0]
			);
			console.log("User Inserted");
		}

		const token = createToken(id);

		res.status(201).json({ email, username, token });
	} catch (err) {
		const error = handleErrors(err);

		console.log(err);
		res.status(401).json({ error });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const userEmail = await pool.query(
			`SELECT ID, EMAIL, PASSWORD, USERNAME FROM USERS WHERE EMAIL = $1`,
			[email]
		);

		if (userEmail.rowCount === 1) {
			const authPassword = await compare(password, userEmail.rows[0].password);

			if (!authPassword) {
				throw Error("password error");
			}
			const token = createToken(userEmail.rows[0].id);

			const userExist = await pool.query(`SELECT * FROM USERS WHERE EMAIL = $1`, [email]);
			if (userExist.rowCount >= 1) {
				await pool.query(
					`INSERT INTO SCORES(username, score, wins, loses, ties, games_played) VALUES ($1, $2, $3, $4, $5, $6)`,
					[userExist.rows[0].username, 0, 0, 0, 0, 0]
				);
				console.log("JOIN User Inserted", userExist.rows);
			}

			res.status(201).json({ email, username: userEmail.rows[0].username, token });
		} else {
			throw Error("email error");
		}
	} catch (err) {
		const error = handleErrors(err);
		console.log(err);
		res.status(401).json({ error });
	}
};

module.exports = { signup, login };
