const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const getHome = async (req, res) => {};

const handleErrors = (error) => {};

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

const signup = async (req, res) => {};

const login = async (req, res) => {};

module.exports = { signup, getHome, login };
