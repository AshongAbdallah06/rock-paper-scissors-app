const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

// const pool = new Pool({
// 	host: process.env.HOST,
// 	database: process.env.DATABASE,
// 	port: process.env.DBPORT,
// 	user: process.env.USER,
// 	password: process.env.PASSWORD,
// });

module.exports = pool;
