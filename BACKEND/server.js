require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
	cors: {
		origin: "*",
	},
});

const allowedOrigins = ["http://localhost:3000", "https://rock-paper-scissors-app-nine.vercel.app"];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
	})
);
app.options(
	"*",
	cors({
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
	})
);
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
							: "Player1 wins";
					break;
				case "p":
					game[roomId].result =
						game[roomId].p2 === "r"
							? "Player1 wins"
							: game[roomId].p2 === "p"
							? "Tie"
							: "Player2 wins";
					break;
				case "s":
					game[roomId].result =
						game[roomId].p2 === "r"
							? "Player2 wins"
							: game[roomId].p2 === "p"
							? "Player1 wins"
							: "Tie";
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
});

app.use("/api/user", userRoutes);
app.use("/api/user", gameRoutes);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
	console.log("Listening to port " + PORT);
});
