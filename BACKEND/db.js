const { Pool } = require("pg");

const pool = new Pool({
	host: process.env.HOST,
	database: process.env.DATABASE,
	user: process.env.USER,
	password: process.env.PASSWORD,
	port: process.env.DBPORT,
});

module.exports = pool;
