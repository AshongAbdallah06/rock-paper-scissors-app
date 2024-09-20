require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");
const socketIo = require("socket.io");
const pool = require("./db");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
	cors: {
		origin: "*",
	},
});

const allowedOrigins = ["http://localhost:3000", "https://rock-paper-scissors-app-nine.vercel.app"];

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
	optionsSuccessStatus: 200, // For legacy browser support
	credentials: true, // Enable if you need to send cookies or HTTP authentication
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

	socket.on("join_room", (id) => {
		roomId = id;
		socket.join(roomId);

		if (!gameRooms[roomId]) {
			gameRooms[roomId] = { p1_ID: null, p2_ID: null };
		}

		if (!usernames[roomId]) {
			usernames[roomId] = { p1Username: null, p2Username: null };
		}

		if (!gameRooms[roomId].p1_ID) {
			gameRooms[roomId].p1_ID = socket.id;
		} else if (!gameRooms[roomId].p2_ID) {
			gameRooms[roomId].p2_ID = socket.id;
		}

		if (!game[roomId]) {
			game[roomId] = { p1: null, p2: null, result: null };
		}
		console.log("Joined: ", socket.id);
	});

	socket.on("move-made", (username) => {
		socket.broadcast.to(roomId).emit("move-made", { msg: username + " has made a move" });
	});

	socket.on("leaveRoom", (username) => {
		// Broadcast a message that the user has left

		// Remove the username from the room
		if (usernames[roomId]?.p1Username === username) {
			usernames[roomId].p1Username = null;
		} else if (usernames[roomId]?.p2Username === username) {
			usernames[roomId].p2Username = null;
		}

		// Clean up the room if it's empty
		if (!usernames[roomId]?.p1Username && !usernames[roomId]?.p2Username) {
			delete usernames[roomId];

			io.to(roomId).emit("deleteUsernames");
		}

		// Emit the updated usernames list to the room
		io.to(roomId).emit("updateUsernames", usernames[roomId]);
		io.to(roomId).emit("leaveRoom", { msg: username + " has left the room" });
	});

	socket.on("username", (username) => {
		if (!usernames[roomId]?.p1Username) {
			usernames[roomId].p1Username = username;
		} else if (!usernames[roomId].p2Username && username !== usernames[roomId].p1Username) {
			usernames[roomId].p2Username = username;
		}
		// else {
		// 	console.log("Both usernames are already assigned or username is a duplicate.");
		// }

		// console.log("Joined: ", usernames);todo:

		io.to(roomId).emit("updateUsernames", usernames[roomId]);
	});

	socket.on("move", (move) => {
		if (!roomId || !game[roomId]) return;

		if (!game[roomId].p1) {
			game[roomId].p1 = move;
		} else if (!game[roomId].p2) {
			game[roomId].p2 = move;
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

	socket.on("message", async (message) => {
		// Broadcast message to all clients
		const { username, textMessage } = message;
		io.to(roomId).emit("message", { username, textMessage });
	});

	socket.on("deleteMessage", () => {
		io.to(roomId).emit("deleteMessage");
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
			const response = await pool.query("SELECT * FROM SCORES ORDER BY LOSES DESC");
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

	socket.on("updateStats", async ({ gamesPlayed, wins, loses, ties, username }) => {
		try {
			await pool.query(
				`UPDATE SCORES SET GAMES_PLAYED = $1, WINS = $2, LOSES = $3, TIES = $4 WHERE USERNAME = $5`,
				[gamesPlayed, wins, loses, ties, username]
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
			await pool.query(`UPDATE DUAL_PLAYER_SCORES SET GAMES_PLAYED = $1, TIES = $2`, [
				data.games_played,
				data.ties,
			]);

			await pool.query(
				`UPDATE DUAL_PLAYER_SCORES SET PLAYER1_WINS = $1, PLAYER1_LOSSES = $2 WHERE PLAYER1_USERNAME = $3`,
				[data.player1_wins || 0, data.player1_losses || 0, data.player1_username || 0]
			);

			await pool.query(
				`UPDATE DUAL_PLAYER_SCORES SET PLAYER2_WINS = $1, PLAYER2_LOSSES = $2 WHERE PLAYER2_USERNAME = $3`,
				[data.player2_wins || 0, data.player2_losses || 0, data.player2_username || 0]
			);
			const response = await pool.query("SELECT * FROM DUAL_PLAYER_SCORES");
			const userStats = response.rows;

			io.to(roomId).emit("updateDualPlayerStats", userStats);
		} catch (error) {
			console.log("🚀 ~ socket.on ~ error:", error);
		}

		io.emit("updateDualPlayerStats", "updateDualPlayerStats");
	});
});

app.use("/api/user", userRoutes);
app.use("/api/user", gameRoutes);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
	console.log("Listening to port " + PORT);
});
