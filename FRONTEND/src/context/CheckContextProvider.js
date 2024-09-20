import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import Axios from "axios";
import useFunctions from "../hooks/useFunctions";

// const socket = io("https://rock-paper-scissors-app-iybf.onrender.com");
// const socket = io("http://192.168.8.197:4001");
const socket = io("http://localhost:4001");
export const CheckContext = createContext();

const CheckContextProvider = ({ children }) => {
	const {
		checkPlayersMoves,
		checkOptions,
		playerMoveImage,
		setPlayerMoveImage,
		computerMoveImage,
		setComputerMoveImage,
		generateComputerMove,
		getAllScores,
	} = useFunctions();

	const user = JSON.parse(localStorage.getItem("user"));
	//Check if it's a one player game
	// When a player joins a room
	const playerMode = JSON.parse(localStorage.getItem("player-mode"));
	const [isOnePlayer, setIsOnePlayer] = useState(
		playerMode && playerMode === "dual" ? false : true
	);
	const [playerIsChosen, setPlayerIsChosen] = useState(playerMode && true);
	// When a player join a room
	const [roomIsSelected, setRoomIsSelected] = useState(
		playerMode && playerMode === "single" && true
	);
	// When a player leaves a room
	const [leftRoom, setLeftRoom] = useState(false);
	const [gameState, setGameState] = useState({ p1: null, p2: null, result: null });
	const [isRulesModalShow, setIsRulesModalShow] = useState(false);
	// PlayerMove and ComputerMove are used as Player1 and Player2 in dual-mode respectively
	const [playerMove, setPlayerMove] = useState(null);
	const [computerMove, setComputerMove] = useState(null);
	const [result, setResult] = useState("");
	const [moveAck, setMoveAck] = useState(false);
	const [roomID, setRoomID] = useState(JSON.parse(localStorage.getItem("room-id")) || null);
	const usernames = JSON.parse(localStorage.getItem("usernames"));

	// Player 1 and Player 2 score state
	const [p1Score, setP1Score] = useState(
		(!isOnePlayer &&
			JSON.parse(
				localStorage.getItem(
					`${roomID + usernames?.p1Username + usernames?.p2Username}-p1score`
				)
			)) ||
			0
	);
	const [p2Score, setP2Score] = useState(
		(!isOnePlayer &&
			JSON.parse(
				localStorage.getItem(
					`${roomID + usernames?.p1Username + usernames?.p2Username}-p2score`
				)
			)) ||
			0
	);

	const [currentUserStats, setCurrentUserStats] = useState({
		score: 0,
		username: user?.username,
		gamesPlayed: 0,
		wins: 0,
		loses: 0,
		ties: 0,
	});

	const [selectedUserStats, setSelectedUserStats] = useState(
		JSON.parse(localStorage.getItem("selectedUser")) || null
	);
	const [userExists, setUserExists] = useState(null);
	// Score on leaderboard
	const [scores, setScores] = useState(null);
	const [errorOccurred, setErrorOccurred] = useState(null);

	const listenToMove = () => {
		socket.on("move-made", (message) => {
			setMoveAck(message);
			setTimeout(() => {
				setMoveAck("");
			}, 3000);
		});

		return () => {
			socket.off("move-made");
		};
	};

	useEffect(() => {
		listenToMove();
	}, []);

	const p1localStorageScore = `${roomID + usernames?.p1Username + usernames?.p2Username}-p1score`;
	useEffect(() => {
		if (playerMove)
			!isOnePlayer && localStorage.setItem(p1localStorageScore, JSON.stringify(p1Score));
	}, [p1Score]);

	const p2localStorageScore = `${roomID + usernames?.p1Username + usernames?.p2Username}-p2score`;
	useEffect(() => {
		if (computerMove)
			!isOnePlayer && localStorage.setItem(p2localStorageScore, JSON.stringify(p2Score));
	}, [p2Score]);

	useEffect(() => {
		if (isOnePlayer) {
			checkOptions(
				playerMove,
				computerMove,
				setPlayerMoveImage,
				setComputerMoveImage,
				result,
				setResult,
				socket
			);
		} else {
			if (result === "Player1 wins") {
				setTimeout(() => setP1Score(p1Score + 1), 3000);
			} else if (result === "Player2 wins") {
				setTimeout(() => setP2Score(p2Score + 1), 3000);
			}
		}
	}, [playerMove, computerMove, isOnePlayer, result]);

	useEffect(() => {
		setPlayerMove(!isOnePlayer && gameState.p1);
		setComputerMove(!isOnePlayer && gameState.p2);
		setResult(!isOnePlayer && gameState.result);

		!isOnePlayer && checkPlayersMoves(gameState, setPlayerMoveImage, setComputerMoveImage);
	}, [isOnePlayer, gameState.p1 && gameState.p2]);

	// Send move in dual player mode
	useEffect(() => {
		socket.on("move", (newGameState) => {
			setGameState(newGameState);
		});

		return () => {
			socket.off("move");
		};
	}, []);

	const moveOnclick = (move) => {
		if (!isOnePlayer) {
			if (!playerMove) {
				setPlayerMove(move);
			} else if (!computerMove) {
				setComputerMove(move);
			}
		}
		setPlayerMove(move);
		makeMove(move);
		isOnePlayer && setPlayerMove(move);
		isOnePlayer && generateComputerMove(setComputerMove);
	};

	const getUserStats = async (username) => {
		try {
			const res = await Axios
				.get
				// `https://rock-paper-scissors-app-iybf.onrender.com/api/user/stats/${username}`
				();
			const data = res?.data[0] || {};

			if (username === user?.username) {
				setCurrentUserStats({
					...currentUserStats,
					score: data.score || 0,
					gamesPlayed: data.games_played || 0,
					lastPlayed: data.last_played,
					loses: data.loses || 0,
					ties: data.ties || 0,
					wins: data.wins || 0,
					username: user?.username,
				});
			} else {
				setSelectedUserStats(data);
			}
		} catch (error) {
			console.error("🚀 ~ getUserStats ~ error:", error);

			setErrorOccurred("Could not fetch user data.");
		}
	};

	const getPlayerStats = async (p1Username, p2Username) => {
		try {
			const res = await Axios.post(
				// `https://rock-paper-scissors-app-iybf.onrender.com/api/user/stats/${username}`
				`http://localhost:4001/api/user/stats`,
				{
					p1Username,
					p2Username,
				}
			);

			const data = res?.data[0] || {};
			setDualPlayerStats({
				game_id: "1",
				player1_username: usernames?.p1Username,
				player1_wins: data.player1_wins,
				user1_losses: data.user1_losses,
				player2_username: usernames?.p2Username,
				player2_wins: data.player2_wins,
				player2_losses: data.player2_losses,
				ties: data.ties,
				games_played: data.games_played,
				last_played: data.last_played,
			});
		} catch (error) {
			console.error("🚀 ~ getUserStats ~ error:", error);

			setErrorOccurred("Could not fetch user data.");
		}
	};

	useEffect(() => {
		localStorage.setItem("selectedUser", JSON.stringify(selectedUserStats));
	}, [selectedUserStats]);

	useEffect(() => {
		if (
			isOnePlayer &&
			currentUserStats.username === user?.username &&
			currentUserStats.gamesPlayed > 0
		) {
			socket.emit("updateStats", currentUserStats);
		}
	}, [currentUserStats, isOnePlayer]);

	const [dualPlayerStats, setDualPlayerStats] = useState({
		player1_username: usernames?.p1Username,
		player1_wins: 0,
		player1_losses: 0,
		player2_username: usernames?.p2Username,
		player2_wins: 0,
		player2_losses: 0,
		ties: 0,
		games_played: 0,
	});
	useEffect(() => {
		if (isOnePlayer) {
			setCurrentUserStats((prevStats) => {
				let updatedStats = { ...prevStats };

				if (result === "Tie") {
					updatedStats.ties = (updatedStats.ties || 0) + 1;
				} else if (result === "Player wins") {
					updatedStats.wins = (updatedStats.wins || 0) + 1;
				} else if (result === "Computer wins") {
					updatedStats.loses = (updatedStats.loses || 0) + 1;
				}

				updatedStats.gamesPlayed =
					(updatedStats.wins || 0) + (updatedStats.loses || 0) + (updatedStats.ties || 0);

				return updatedStats;
			});
		} else {
			setDualPlayerStats((prevStats) => {
				let updatedDualPlayerStats = { ...prevStats };

				if (result === "Tie") {
					updatedDualPlayerStats.ties = (updatedDualPlayerStats.ties || 0) + 1;
				} else if (result === "Player1 wins") {
					updatedDualPlayerStats.player1_wins =
						(updatedDualPlayerStats.player1_wins || 0) + 1;
					updatedDualPlayerStats.player2_losses =
						(updatedDualPlayerStats.player2_losses || 0) + 1;
				} else if (result === "Player2 wins") {
					updatedDualPlayerStats.player2_wins =
						(updatedDualPlayerStats.player2_wins || 0) + 1;
					updatedDualPlayerStats.player1_losses =
						(updatedDualPlayerStats.player1_losses || 0) + 1;
				}

				updatedDualPlayerStats.games_played =
					(updatedDualPlayerStats.player1_wins || 0) +
					(updatedDualPlayerStats.player1_losses || 0) +
					updatedDualPlayerStats.ties;
				return updatedDualPlayerStats;
			});
		}
	}, [result, isOnePlayer]);

	useEffect(() => {
		if (dualPlayerStats.games_played > 0) {
			socket.emit("updateDualPlayerStats", dualPlayerStats);
			console.log("updateDualPlayerStats", dualPlayerStats);
		}
	}, [dualPlayerStats]);

	useEffect(() => {
		socket.on("clearMoves", (newGameState) => {
			setGameState(newGameState);
		});

		return () => {
			socket.off("clearMoves");
		};
	}, [gameState]);

	const makeMove = (move) => {
		socket.emit("move", move);
	};

	const clearMoves = () => {
		socket.emit("clearMoves");
	};

	const authorize = async () => {
		try {
			const res = await Axios.get(
				// "https://rock-paper-scissors-app-iybf.onrender.com/api/user",
				// "http://192.168.8.197:4001/api/user",
				"http://localhost:4001/api/user",
				{
					headers: { Authorization: `Bearer ${user.token}` },
				}
			);
			// const json = res.data; //  parse JSON responses

			if (window.location.pathname === "/signup" || window.location.pathname === "/login") {
				window.location.href = "/";
			}
		} catch (error) {
			if (window.location.pathname !== "/signup") {
				window.location.href = "/login";
			}
		}
	};

	useEffect(() => {
		getAllScores(socket, setScores);
	}, [socket, result, playerMove]);

	return (
		<CheckContext.Provider
			value={{
				playerMove,
				computerMove,
				setPlayerMove,
				setComputerMove,
				result,
				setResult,
				playerMoveImage,
				computerMoveImage,
				socket,
				makeMove,
				gameState,
				isOnePlayer,
				setIsOnePlayer,
				playerIsChosen,
				setPlayerIsChosen,
				roomID,
				setRoomID,
				roomIsSelected,
				setRoomIsSelected,
				clearMoves,
				p1Score,
				setP1Score,
				p2Score,
				setP2Score,
				authorize,
				userExists,
				setUserExists,
				isRulesModalShow,
				setIsRulesModalShow,
				moveOnclick,
				moveAck,
				setMoveAck,
				listenToMove,
				leftRoom,
				setLeftRoom,
				currentUserStats,
				setCurrentUserStats,
				scores,
				setScores,
				getUserStats,
				getPlayerStats,
				selectedUserStats,
				dualPlayerStats,
				errorOccurred,
				setErrorOccurred,
			}}
		>
			{children}
		</CheckContext.Provider>
	);
};

export default CheckContextProvider;
