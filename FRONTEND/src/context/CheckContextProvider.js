import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import useFunctions from "../hooks/useFunctions";

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
	} = useFunctions();

	// Player moves and result states
	// PlayerMove and ComputerMove are used as Player1 and Player2 in dual-mode respectively
	const [playerMove, setPlayerMove] = useState(null);
	const [computerMove, setComputerMove] = useState(null);
	const [result, setResult] = useState("");

	const [score, setScore] = useState(JSON.parse(localStorage.getItem("score")) || 0);

	//Check if it's a one player game
	const [isOnePlayer, setIsOnePlayer] = useState(false);
	const [playerIsChosen, setPlayerIsChosen] = useState(false);

	//
	const [roomIsSelected, setRoomIsSelected] = useState(false);

	// User Status
	const [userExist, setUserExist] = useState();

	// Save score to localStorage
	useEffect(() => {
		localStorage.setItem("score", JSON.stringify(score));
	}, [score]);

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
	}, [playerMove, computerMove]);

	const [gameState, setGameState] = useState({ p1: null, p2: null, result: null });

	// Join room
	const [roomID, setRoomID] = useState(null);
	const joinRoom = () => {
		socket.emit("join_room", roomID);
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
	}, [socket]);

	useEffect(() => {
		socket.on("clearMoves", (newGameState) => {
			setGameState(newGameState);

			console.log("New Gamestate: ", gameState);
		});

		// Clean up the socket connection when the component unmounts
		return () => {
			socket.off("clearMoves");
		};
	}, [gameState]);

	const makeMove = (move) => {
		socket.emit("move", { move });
	};

	useEffect(() => {
		setPlayerMove(!isOnePlayer && gameState.p1?.move);
		setComputerMove(!isOnePlayer && gameState.p2?.move);
		setResult(!isOnePlayer && gameState.result);

		!isOnePlayer && checkPlayersMoves(gameState, setPlayerMoveImage, setComputerMoveImage);
	}, [isOnePlayer, gameState.p1 && gameState.p2]);

	const clearMoves = () => {
		socket.emit("clearMoves");
	};

	// Clear all states when page reloads
	useEffect(() => {
		const handleBeforeUnload = () => {
			socket.emit("leaveRoom", roomID);
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [socket, roomID]);

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
				userExist,
				setUserExist,
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
			}}
		>
			{children}
		</CheckContext.Provider>
	);
};

export default CheckContextProvider;
