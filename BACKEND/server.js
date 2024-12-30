require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");
const socketIo = require("socket.io");
const pool = require("./db");
const { v4: uuid } = require("uuid");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
	"https://rock-paper-scissors-app-git-f-2d75bc-ashongabdallah06s-projects.vercel.app",
	"https://rock-paper-scissors-app-nine.vercel.app",
	"https://rock-paper-scissors-typescript-app.vercel.app"
];

const io = socketIo(server, {
	cors: {
		origin: allowedOrigins,
	},
});

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	optionsSuccessStatus: 200,
	credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const gameRooms = {};
const game = {};
let usernames = {};

app.get("/", (req, res) => {
	res.json({ msg: "Hello" });
});

io.on("connect", (socket) => {
	let roomId;
	const sqlQuery = `SELECT * FROM DUAL_PLAYER_SCORES WHERE (PLAYER1_USERNAME = $1 AND PLAYER2_USERNAME = $2) OR (PLAYER1_USERNAME = $2 AND PLAYER2_USERNAME = $1)`;

	socket.on("join-room", async ({ id, username }) => {
		roomId = id;
		socket.join(roomId);

		if (!gameRooms[roomId]) {
			gameRooms[roomId] = { p1_ID: null, p2_ID: null };
		}

		if (!game[roomId]) {
			game[roomId] = { p1: null, p2: null, result: null };
		}

		if (!gameRooms[roomId]) {
			gameRooms[roomId] = { p1_ID: null, p2_ID: null };
		}

		if (!gameRooms[roomId].p1_ID) {
			gameRooms[roomId].p1_ID = socket.id;
		} else if (!gameRooms[roomId].p2_ID) {
			gameRooms[roomId].p2_ID = socket.id;
		}

		if (!usernames[roomId]) {
			usernames[roomId] = { p1Username: null, p2Username: null };
		}

		if (!usernames[roomId]?.p1Username) {
			usernames[roomId].p1Username = username;
		} else if (!usernames[roomId].p2Username && username !== usernames[roomId].p1Username) {
			usernames[roomId].p2Username = username;

			try {
				const response = await pool.query(sqlQuery, [
					usernames[roomId]?.p1Username,
					usernames[roomId]?.p2Username,
				]);

				if (response.rowCount === 0) {
					const randomId = uuid();
					await pool.query(
						`INSERT INTO DUAL_PLAYER_SCORES VALUES($1,$2,0,0,$3,0,0,0,0)`,
						[randomId, usernames[roomId]?.p1Username, usernames[roomId]?.p2Username]
					);

					io.to(roomId).emit("getDualPlayerStats", response.rows);
				}
			} catch (error) {
				console.log("🚀 ~ getUserStats ~ error:", error);
				io.to(roomId).emit("getDualPlayerStats");
				return;
			}
		}

		const response = await pool.query(sqlQuery, [
			usernames[roomId]?.p1Username,
			usernames[roomId]?.p2Username,
		]);
		if (response.rowCount === 1) {
			io.to(roomId).emit("updateUsernames", {
				p1Username: response.rows[0].player1_username,
				p2Username: response.rows[0].player2_username,
			});
		} else {
			io.to(roomId).emit("updateUsernames", { p1Username: username });
		}
	});

	socket.on("move-made", (username) => {
		socket.broadcast.to(roomId).emit("move-made", { msg: username + " has made a move" });
	});

	socket.on("leave-room", (username) => {
		// Remove the username from the room
		if (usernames[roomId]?.p1Username === username) {
			usernames[roomId].p1Username = null;
		} else if (usernames[roomId]?.p2Username === username) {
			usernames[roomId].p2Username = null;
		}

		// Clean up the room if it's empty
		if (!usernames[roomId]?.p1Username && !usernames[roomId]?.p2Username) {
			delete usernames[roomId];
		}

		// Emit the updated usernames list to the room
		io.to(roomId).emit("updateUsernames", usernames[roomId]);
		io.to(roomId).emit("leave-room", { msg: username + " has left the room" });
	});

	socket.on("move", async ({ username, move }) => {
		if (!roomId || !game[roomId]) return;

		const response = await pool.query(sqlQuery, [
			usernames[roomId]?.p1Username,
			usernames[roomId]?.p2Username,
		]);
		if (response.rowCount === 1) {
			if (response.rows[0]?.player1_username === username) {
				game[roomId].p1 = move;
			} else if (response?.rows[0].player2_username === username) {
				game[roomId].p2 = move;
			}
		}

		if (game[roomId].p1 && game[roomId].p2) {
			switch (game[roomId].p1) {
				case "r":
					game[roomId].result =
						game[roomId].p2 === "r"
							? "Tie"
							: game[roomId].p2 === "p"
							? "Player2 wins"
							: game[roomId].p2 === "s"
							? "Player1 wins"
							: game[roomId].p2 === "l"
							? "Player1 wins"
							: game[roomId].p2 === "sp" && "Player2 wins";
					break;
				case "p":
					game[roomId].result =
						game[roomId].p2 === "r"
							? "Player1 wins"
							: game[roomId].p2 === "p"
							? "Tie"
							: game[roomId].p2 === "s"
							? "Player2 wins"
							: game[roomId].p2 === "l"
							? "Player2 wins"
							: game[roomId].p2 === "sp" && "Player1 wins";
					break;
				case "s":
					game[roomId].result =
						game[roomId].p2 === "r"
							? "Player2 wins"
							: game[roomId].p2 === "p"
							? "Player1 wins"
							: game[roomId].p2 === "s"
							? "Tie"
							: game[roomId].p2 === "l"
							? "Player1 wins"
							: game[roomId].p2 === "sp" && "Player2 wins";
					break;
				case "l":
					game[roomId].result =
						game[roomId].p2 === "r"
							? "Player2 wins"
							: game[roomId].p2 === "p"
							? "Player1 wins"
							: game[roomId].p2 === "s"
							? "Player2 wins"
							: game[roomId].p2 === "l"
							? "Tie"
							: game[roomId].p2 === "sp" && "Player1 wins";
					break;
				case "sp":
					game[roomId].result =
						game[roomId].p2 === "r"
							? "Player1 wins"
							: game[roomId].p2 === "p"
							? "Player2 wins"
							: game[roomId].p2 === "s"
							? "Player1 wins"
							: game[roomId].p2 === "l"
							? "Player2 wins"
							: game[roomId].p2 === "sp" && "Tie";
					break;
			}

			io.to(roomId).emit("move", game[roomId]);
		}
	});

	socket.on("clearMoves", () => {
		if (roomId && game[roomId]) {
			game[roomId] = { p1: null, p2: null, result: null };
			io.to(roomId).emit("clearMoves", game[roomId]);
		}
	});

	socket.on("message", async ({ username, textMessage }) => {
		io.to(roomId).emit("message", { username, textMessage });
	});

	socket.on("getAllScores", async () => {
		try {
			const response = await pool.query("SELECT * FROM SCORES ORDER BY WINS DESC");
			const scores = response.rows;

			io.emit("getAllScores", scores);
		} catch (error) {
			console.error("🚀 ~ getScores ~ error:", error);
		}
	});

	socket.on("getScoresByLosses", async () => {
		try {
			const response = await pool.query("SELECT * FROM SCORES ORDER BY LOSSES DESC");
			const scores = response.rows;

			io.emit("getScoresByLosses", scores);
		} catch (error) {
			console.error("🚀 ~ getScores ~ error:", error);
		}
	});

	socket.on("getScoresByTies", async () => {
		try {
			const response = await pool.query("SELECT * FROM SCORES ORDER BY TIES DESC");
			const scores = response.rows;

			io.emit("getScoresByTies", scores);
		} catch (error) {
			console.error("🚀 ~ getScores ~ error:", error);
		}
	});

	socket.on("getScoresByGamesPlayed", async () => {
		try {
			const response = await pool.query("SELECT * FROM SCORES ORDER BY GAMES_PLAYED DESC");
			const scores = response.rows;

			io.emit("getScoresByGamesPlayed", scores);
		} catch (error) {
			console.error("🚀 ~ getScores ~ error:", error);
		}
	});

	socket.on("updateStats", async ({ gamesPlayed, wins, losses, ties, username, lastPlayed }) => {
		try {
			await pool.query(
				`UPDATE SCORES SET GAMES_PLAYED = $1, WINS = $2, LOSSES = $3, TIES = $4, LAST_PLAYED = $5::timestamp with time zone WHERE USERNAME = $6`,
				[gamesPlayed, wins, losses, ties, lastPlayed, username]
			);

			const response = await pool.query("SELECT * FROM SCORES WHERE USERNAME = $1", [
				username,
			]);
			const userStats = response.rows;
			io.to(roomId).emit("updateStats", userStats);
		} catch (error) {
			console.log("🚀 ~ socket.on ~ error:", error);
		}
	});

	socket.on("updateDualPlayerStats", async (data) => {
		try {
			await pool.query(
				`UPDATE DUAL_PLAYER_SCORES SET GAMES_PLAYED = $1, TIES = $2 WHERE (PLAYER1_USERNAME = $3 AND PLAYER2_USERNAME = $4) OR (PLAYER1_USERNAME = $4 AND PLAYER2_USERNAME = $3)`,
				[
					data.games_played || 0,
					data.ties || 0,
					data.player1_username,
					data.player2_username,
				]
			);

			await pool.query(
				`UPDATE DUAL_PLAYER_SCORES SET PLAYER1_WINS = $1, PLAYER1_LOSSES = $2 WHERE (PLAYER1_USERNAME = $3 AND PLAYER2_USERNAME = $4) OR (PLAYER1_USERNAME = $4 AND PLAYER2_USERNAME = $3)`,
				[
					data.player1_wins || 0,
					data.player1_losses || 0,
					data.player1_username,
					data.player2_username,
				]
			);

			await pool.query(
				`UPDATE DUAL_PLAYER_SCORES SET PLAYER2_WINS = $1, PLAYER2_LOSSES = $2 WHERE (PLAYER1_USERNAME = $3 AND PLAYER2_USERNAME = $4) OR (PLAYER1_USERNAME = $4 AND PLAYER2_USERNAME = $3)`,
				[
					data.player2_wins || 0,
					data.player2_losses || 0,
					data.player2_username,
					data.player1_username,
				]
			);
		} catch (error) {
			console.log("🚀 ~ socket.on ~ error:", error);
		}

		io.emit("updateDualPlayerStats", "updateDualPlayerStats");
	});

	socket.on("disconnect", () => {
		// Remove the player from gameRooms and usernames
		for (const room in gameRooms) {
			const players = gameRooms[room];
			if (players.p1_ID === socket.id) {
				players.p1_ID = null;
				usernames[room].p1Username = null;
				io.to(roomId).emit("updateUsernames", usernames[roomId]);
			} else if (players.p2_ID === socket.id) {
				players.p2_ID = null;
				usernames[room].p2Username = null;
				io.to(roomId).emit("updateUsernames", usernames[roomId]);
			}

			// If both players have left, clear the room data
			if (!players.p1_ID && !players.p2_ID) {
				delete gameRooms[room];
				delete usernames[room];
				delete game[room];
			}
		}
	});
});

app.use("/api/user", userRoutes);
app.use("/api/user", gameRoutes);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
	console.log("Listening to port " + PORT);
});
