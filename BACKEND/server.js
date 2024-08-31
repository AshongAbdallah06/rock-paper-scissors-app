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
let numClients = {};
let usernames = {};

app.get("/", (req, res) => {
	res.json({ msg: "Hello" });
});

io.on("connect", (socket) => {
	let roomId;

	socket.on("username", (username) => {
		console.log("Received Username: ", username);

		if (!usernames[roomId]?.p1Username) {
			usernames[roomId].p1Username = username;
			console.log(`Assigned to p1Username: ${usernames[roomId].p1Username}`);
		} else if (!usernames[roomId].p2Username && username !== usernames[roomId].p1Username) {
			usernames[roomId].p2Username = username;
			console.log(`Assigned to p2Username: ${usernames[roomId].p2Username}`);
		} else {
			console.log("Both usernames are already assigned or username is a duplicate.");
		}

		console.log("Current usernames object: ", usernames);

		io.to(roomId).emit("updateUsernames", usernames[roomId]);
	});

	socket.on("move-made", (username) => {
		socket.broadcast.to(roomId).emit("move-made", { msg: username + " has made a move" });
	});

	socket.on("join_room", (id) => {
		roomId = id;
		socket.join(roomId);

		if (!numClients[roomId]) {
			numClients[roomId] = 1;
		} else {
			numClients[roomId]++;
		}

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
	});

	socket.on("leaveRoom", (username) => {
		console.log("Message: ", { msg: username + " has left the room" });

		socket.broadcast.to(roomId).emit("leaveRoom", { msg: username + " has left the room" });
	});

	console.log("Joined: ", socket.id);
	socket.on("username", (username) => {
		console.log("Received Username: ", username);

		if (!usernames[roomId]?.p1Username) {
			usernames[roomId].p1Username = username;
			console.log(`Assigned to p1Username: ${usernames[roomId].p1Username}`);
		} else if (!usernames[roomId].p2Username && username !== usernames[roomId].p1Username) {
			usernames[roomId].p2Username = username;
			console.log(`Assigned to p2Username: ${usernames[roomId].p2Username}`);
		} else {
			console.log("Both usernames are already assigned or username is a duplicate.");
		}

		console.log("Current usernames object: ", usernames);

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

	socket.on("updateScore", async ({ score, username }) => {
		try {
			const user = await pool.query(`SELECT * FROM SCORES WHERE USERNAME = $1`, [username]);

			console.log("User: ", user.rows);

			if (!user.rows[0]?.username) {
				await pool.query(
					`INSERT INTO SCORES(username,score,wins,loses,ties,games_played) VALUES($1,$2,$3,$4,$5,$6)`,
					[username, 0, 0, 0, 0, 0]
				);

				console.log("Score: ", score);
			} else {
				await pool.query(`UPDATE SCORES SET SCORE = $1 WHERE USERNAME = $2`, [
					score,
					username,
				]);
				const userScore = await pool.query(`SELECT score FROM SCORES WHERE USERNAME = $1`, [
					username,
				]);

				console.log("Score: ", userScore.rows, score);
				io.to(roomId).emit("updateScore", userScore.rows[0].score);
			}
		} catch (error) {
			console.log("🚀 ~ getScores ~ error:", error.message);

			if (error?.detail) io.to(roomId).emit("error-message", { error: error.message });
		}
	});

	socket.on("getAllScores", async () => {
		try {
			// console.log("🚀 ~ getScores ~ Fetching scores from database");
			const response = await pool.query("SELECT * FROM SCORES ORDER BY SCORE DESC");
			const scores = response.rows;
			console.log("🚀 ~ getScores ~ Success:", scores);

			io.to(roomId).emit("getAllScores", scores);
		} catch (error) {
			console.error("🚀 ~ getScores ~ error:", error);
		}
	});
});

app.use("/api/user", userRoutes);
app.use("/api/user", gameRoutes);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
	console.log("Listening to port " + PORT);
});
