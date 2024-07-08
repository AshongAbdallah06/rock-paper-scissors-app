import React, { createContext, useState } from "react";
import scissorsIcon from "../images/icon-scissors.svg";
import paperIcon from "../images/icon-paper.svg";
import rockIcon from "../images/icon-rock.svg";

export const CheckContext = createContext();
const CheckContextProvider = ({ children }) => {
	const [playerMove, setPlayerMove] = useState(null);
	const [computerMove, setComputerMove] = useState(null);
	const [result, setResult] = useState("");
	const [score, setScore] = useState(JSON.parse(localStorage.getItem("score")) || 0);

	// Images for player and computer moves
	const [playerMoveImage, setPlayerMoveImage] = useState("");
	const [computerMoveImage, setComputerMoveImage] = useState("");

	const checkOptions = () => {
		setResult("...");

		switch (playerMove) {
			case "rock":
				setPlayerMoveImage(rockIcon);

				if (playerMove === "rock" && computerMove === "rock") {
					setResult("Tie");
					setComputerMoveImage(rockIcon);
				} else if (playerMove === "rock" && computerMove === "paper") {
					setResult("Computer wins");
					setComputerMoveImage(paperIcon);
				} else if (playerMove === "rock" && computerMove === "scissors") {
					setResult("Player wins");
					setComputerMoveImage(scissorsIcon);
					setTimeout(() => {
						setScore(score + 1);
					}, 3000);
				}
				break;
			case "paper":
				setPlayerMoveImage(paperIcon);
				if (playerMove === "paper" && computerMove === "rock") {
					setResult("Player wins");
					setComputerMoveImage(rockIcon);
					setTimeout(() => {
						setScore(score + 1);
					}, 3000);
				} else if (playerMove === "paper" && computerMove === "paper") {
					setResult("Tie");
					setComputerMoveImage(paperIcon);
				} else if (playerMove === "paper" && computerMove === "scissors") {
					setResult("Computer wins");
					setComputerMoveImage(scissorsIcon);
				}

				break;
			case "scissors":
				setPlayerMoveImage(scissorsIcon);
				if (playerMove === "scissors" && computerMove === "rock") {
					setResult("Computer wins");
					setComputerMoveImage(rockIcon);
				} else if (playerMove === "scissors" && computerMove === "paper") {
					setResult("Player wins");
					setComputerMoveImage(paperIcon);
					setTimeout(() => {
						setScore(score + 1);
					}, 3000);
				} else if (playerMove === "scissors" && computerMove === "scissors") {
					setResult("Tie");
					setComputerMoveImage(scissorsIcon);
				}
				break;
			default:
				setResult(result);
				break;
		}
	};

	return (
		<CheckContext.Provider
			value={{
				checkOptions,
				playerMove,
				computerMove,
				setPlayerMove,
				setComputerMove,
				result,
				setResult,
				score,
				playerMoveImage,
				computerMoveImage,
			}}
		>
			{children}
		</CheckContext.Provider>
	);
};

export default CheckContextProvider;
