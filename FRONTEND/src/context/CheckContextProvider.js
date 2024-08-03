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
	} = useFunctions();

	// Player moves and result states
	// PlayerMove and ComputerMove are used as Player1 and Player2 in dual-mode respectively
	const [playerMove, setPlayerMove] = useState(null);
	const [computerMove, setComputerMove] = useState(null);
	const [result, setResult] = useState("");

	const [roomID, setRoomID] = useState(null);

	const [score, setScore] = useState(JSON.parse(localStorage.getItem("score")) || 0);
	const [p1Score, setP1Score] = useState(0);
	const [p2Score, setP2Score] = useState(
		JSON.parse(localStorage.getItem(`${roomID}_p2score`)) || 0
	);

	//Check if it's a one player game
	const [isOnePlayer, setIsOnePlayer] = useState(false);
	const [playerIsChosen, setPlayerIsChosen] = useState(false);

	//
	const [roomIsSelected, setRoomIsSelected] = useState(false);

	// User Status
	const [isAuthorized, setIsAuthorized] = useState(false);

	// Save score to localStorage
	useEffect(() => {
		localStorage.setItem("score", JSON.stringify(score));
	}, [score]);

	const [gameState, setGameState] = useState({ p1: null, p2: null, result: null });

	useEffect(() => {
		isOnePlayer &&
			checkOptions(
				playerMove,
				computerMove,
				setPlayerMoveImage,
				setComputerMoveImage,
				result,
				setResult,
				score,
				setScore
			);

		if (!isOnePlayer) {
			if (result === "Player1 wins") {
				setTimeout(() => {
					setP1Score(p1Score + 1);
				}, 3000);
			} else if (result === "Player2 wins") {
				setTimeout(() => {
					setP2Score(p2Score + 1);
				}, 3000);
			}
		}
	}, [playerMove, computerMove]);

	useEffect(() => {
		setPlayerMove(!isOnePlayer && gameState.p1);
		setComputerMove(!isOnePlayer && gameState.p2);
		setResult(!isOnePlayer && gameState.result);

		!isOnePlayer && checkPlayersMoves(gameState, setPlayerMoveImage, setComputerMoveImage);
	}, [isOnePlayer, gameState.p1 && gameState.p2]);

	// Join room
	const joinRoom = () => {
		socket.emit("join_room", roomID);

		socket.emit("clearMoves");
	};

	// Send move in dual player mode
	useEffect(() => {
		socket.on("move", (newGameState) => {
			setGameState(newGameState);
		});

		// Clean up the socket connection when the component unmounts
		return () => {
			socket.off("move");
		};
	}, []);

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

	const user = JSON.parse(localStorage.getItem("user"));
	/**const authorize = async () => {
		try {
			await Axios.get("http://localhost:4001/api/user", {
				headers: { Authorization: `Bearer ${user.token}` },
			});

			setIsAuthorized(true);
			localStorage.setItem("auth", JSON.stringify(true));
		} catch (error) {
			setIsAuthorized(false);
			localStorage.setItem("auth", JSON.stringify(false));

			if (window.location.pathname !== "/signup") {
				window.location.href = "/login";
			}
		}
	};*/

	return (
		<CheckContext.Provider
			value={{
				playerMove,
				computerMove,
				setPlayerMove,
				setComputerMove,
				result,
				setResult,
				score,
				playerMoveImage,
				computerMoveImage,
				isAuthorized,
				setIsAuthorized,
				socket,
				makeMove,
				gameState,
				isOnePlayer,
				setIsOnePlayer,
				playerIsChosen,
				setPlayerIsChosen,
				roomID,
				setRoomID,
				joinRoom,
				roomIsSelected,
				setRoomIsSelected,
				clearMoves,
				p1Score,
				setP1Score,
				p2Score,
				setP2Score,
				// authorize,
			}}
		>
			{children}
		</CheckContext.Provider>
	);
};

export default CheckContextProvider;
