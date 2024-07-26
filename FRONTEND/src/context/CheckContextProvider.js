import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import useFunctions from "../hooks/useFunctions";

const socket = io("http://192.168.8.188:4001");
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
	}, [playerMove, computerMove, isOnePlayer, result, score]);

	const [gameState, setGameState] = useState({ p1: null, p2: null, result: null });
	useEffect(() => {
		socket.on("move", (newGameState) => {
			setGameState(newGameState);
		});

		// Clean up the socket connection when the component unmounts
		return () => {
			socket.off("move");
		};
	}, []);

	const makeMove = (move) => {
		socket.emit("move", move);
	};

	useEffect(() => {
		setPlayerMove(!isOnePlayer && gameState.p1);
		setComputerMove(!isOnePlayer && gameState.p2);
		setResult(!isOnePlayer && gameState.result);

		!isOnePlayer && checkPlayersMoves(gameState, setPlayerMoveImage, setComputerMoveImage);
	}, [isOnePlayer, gameState.p1 && gameState.p2]);

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
			}}
		>
			{children}
		</CheckContext.Provider>
	);
};

export default CheckContextProvider;
