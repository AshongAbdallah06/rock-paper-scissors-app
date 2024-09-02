import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import Axios from "axios";
import useFunctions from "../hooks/useFunctions";

const socket = io("https://rock-paper-scissors-app-iybf.onrender.com");
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
	} = useFunctions();

	const user = JSON.parse(localStorage.getItem("user"));

	// Show rules modal
	const [isRulesModalShow, setIsRulesModalShow] = useState(false);

	// Player moves and result states
	// PlayerMove and ComputerMove are used as Player1 and Player2 in dual-mode respectively
	const [moveAck, setMoveAck] = useState(false);
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

	const [playerMove, setPlayerMove] = useState(null);
	const [computerMove, setComputerMove] = useState(null);
	const [result, setResult] = useState("");

	const [roomID, setRoomID] = useState(JSON.parse(localStorage.getItem("room-id")) || null);

	const usernames = JSON.parse(localStorage.getItem("usernames"));
	const [p1Score, setP1Score] = useState(
		JSON.parse(
			localStorage.getItem(
				`${roomID + usernames?.p1Username + usernames?.p2Username}-p1score`
			)
		) || 0
	);
	const [p2Score, setP2Score] = useState(
		JSON.parse(
			localStorage.getItem(
				`${roomID + usernames?.p1Username + usernames?.p2Username}-p2score`
			)
		) || 0
	);

	useEffect(() => {
		localStorage.setItem(
			`${roomID + usernames?.p1Username + usernames?.p2Username}-p1score`,
			JSON.stringify(p1Score)
		);
	}, [p1Score]);

	useEffect(() => {
		localStorage.setItem(
			`${roomID + usernames?.p1Username + usernames?.p2Username}-p2score`,
			JSON.stringify(p2Score)
		);
	}, [p2Score]);

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

	const [stats, setStats] = useState({
		score: 0,
		username: user?.username,
		gamesPlayed: 0,
		wins: 0,
		loses: 0,
		ties: 0,
	});
	const getUserStats = async () => {
		try {
			const res = await Axios.get(
				`https://rock-paper-scissors-app-iybf.onrender.com/api/user/stats/${user?.username}`
			);
			const data = res?.data[0] || {};

			setStats((prevStats) => ({
				...prevStats,
				score: data.score || 0,
				gamesPlayed: data.games_played || 0,
				lastPlayed: data.last_played,
				loses: data.loses || 0,
				ties: data.ties || 0,
				wins: data.wins || 0,
				username: user?.username,
			}));
		} catch (error) {
			console.error("🚀 ~ getUserStats ~ error:", error);
		}
	};

	useEffect(() => {
		if (isOnePlayer && user?.username) {
			getUserStats();
		}
	}, [isOnePlayer, user?.username]);

	useEffect(() => {
		if (isOnePlayer) {
			setStats((prevStats) => {
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
		}
	}, [result, isOnePlayer]);

	useEffect(() => {
		if (isOnePlayer && stats.gamesPlayed > 0) {
			// Ensure `gamesPlayed` is not null
			socket.emit("updateStats", stats);
		}
	}, [stats, isOnePlayer]);

	useEffect(() => {
		socket.on("clearMoves", (newGameState) => {
			setGameState(newGameState);
		});

		// Clean up the socket connection when the component unmounts
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

	const [userExists, setUserExists] = useState(null);
	const authorize = async () => {
		try {
			const res = await Axios.get(
				"https://rock-paper-scissors-app-iybf.onrender.com/api/user",
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

	// Score on leaderboard
	const [scores, setScores] = useState(null);

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
				stats,
				setStats,
				scores,
				setScores,
			}}
		>
			{children}
		</CheckContext.Provider>
	);
};

export default CheckContextProvider;
