require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
	cors: {
		origin: "*",
	},
});

app.use(cors({ origin: "http://localhost:3000" }));
// app.use((req, res) => {
// 	console.log(req.path, req.method);
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const gameRooms = {};
const game = {};

app.get("/", (req, res) => {
	res.json({ msg: "Hello" });
});

io.on("connect", (socket) => {
	// Handle incoming messages
	const roomId = "game-room";

	// if (gameRooms[roomId]?.p1_ID && gameRooms[roomId]?.p2_ID) {
	// 	socket.emit("roomFull", "Room is full. Cannot join.");
	// 	console.log("roomFull", "Room is full. Cannot join.");
	// 	return;
	// }

	socket.join(roomId);
	socket.on("message", async (message) => {
		io.to(roomId).emit("message", message); // Broadcast message to all clients
	});

	// Initialize game room if not exists
	if (!gameRooms[roomId]) {
		gameRooms[roomId] = { p1_ID: null, p2_ID: null };
	}

	// Assign player to room
	if (!gameRooms[roomId].p1_ID) {
		gameRooms[roomId].p1_ID = socket.id;
	} else if (!gameRooms[roomId].p2_ID) {
		gameRooms[roomId].p2_ID = socket.id;
	}

	if (!game[roomId]) {
		game[roomId] = { p1: null, p2: null, result: null };
	}

	socket.on("move", async (move) => {
		console.log("Move received: ", move);

		// Initialize the room if it doesn't exist
		if (!game[roomId]) {
			game[roomId] = { p1: null, p2: null, result: null };
		}

		// Store the move in the appropriate slot
		if (!game[roomId].p1) {
			game[roomId].p1 = move;
		} else if (!game[roomId].p2) {
			game[roomId].p2 = move;
		}

		// Check if both moves are present and calculate the result
		if (game[roomId].p1 && game[roomId].p2) {
			switch (game[roomId].p1) {
				case "r":
					if (game[roomId].p2 === "r") {
						game[roomId].result = "Tie";
					} else if (game[roomId].p2 === "p") {
						game[roomId].result = "Player2 wins";
					} else if (game[roomId].p2 === "s") {
						game[roomId].result = "Player1 wins";
					}
					break;
				case "p":
					if (game[roomId].p2 === "r") {
						game[roomId].result = "Player1 wins";
					} else if (game[roomId].p2 === "p") {
						game[roomId].result = "Tie";
					} else if (game[roomId].p2 === "s") {
						game[roomId].result = "Player2 wins";
					}
					break;
				case "s":
					if (game[roomId].p2 === "r") {
						game[roomId].result = "Player2 wins";
					} else if (game[roomId].p2 === "p") {
						game[roomId].result = "Player1 wins";
					} else if (game[roomId].p2 === "s") {
						game[roomId].result = "Tie";
					}
					break;
			}

			setTimeout(() => {
				game[roomId] = null;
			}, 2000);

			console.log(game);
		}

		if (game[roomId].p1 || game[roomId].p2) {
			io.to(roomId).emit("move", game[roomId]);
		}
	});
});

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
	console.log("Listening to port " + PORT);
});
