import scissorsIcon from "../images/icon-scissors.svg";
import paperIcon from "../images/icon-paper.svg";
import rockIcon from "../images/icon-rock.svg";
import { useState } from "react";

const useFunctions = () => {
	// Generate the computer's move
	const generateComputerMove = (setComputerMove) => {
		const randomNumber = Math.floor(Math.random() * 3);

		if (randomNumber === 0) {
			setComputerMove("r");
		} else if (randomNumber === 1) {
			setComputerMove("p");
		} else {
			setComputerMove("s");
		}
	};

	// Images for player and computer moves
	const [playerMoveImage, setPlayerMoveImage] = useState("");
	const [computerMoveImage, setComputerMoveImage] = useState("");

	const checkOptions = (
		playerMove,
		computerMove,
		setPlayerMoveImage,
		setComputerMoveImage,
		result,
		setResult,
		score,
		setScore
	) => {
		switch (playerMove) {
			case "r":
				setPlayerMoveImage(rockIcon);
				if (computerMove === "r") {
					setResult("Tie");
					setComputerMoveImage(rockIcon);
				} else if (computerMove === "p") {
					setResult("Computer wins");
					setComputerMoveImage(paperIcon);
				} else if (computerMove === "s") {
					setResult("Player wins");
					setComputerMoveImage(scissorsIcon);
					setTimeout(() => {
						setScore(score + 1);
					}, 3000);
				}
				break;
			case "p":
				setPlayerMoveImage(paperIcon);
				if (computerMove === "r") {
					setResult("Player wins");
					setComputerMoveImage(rockIcon);
					setTimeout(() => {
						setScore(score + 1);
					}, 3000);
				} else if (computerMove === "p") {
					setResult("Tie");
					setComputerMoveImage(paperIcon);
				} else if (computerMove === "s") {
					setResult("Computer wins");
					setComputerMoveImage(scissorsIcon);
				}
				break;
			case "s":
				setPlayerMoveImage(scissorsIcon);
				if (computerMove === "r") {
					setResult("Computer wins");
					setComputerMoveImage(rockIcon);
				} else if (computerMove === "p") {
					setResult("Player wins");
					setComputerMoveImage(paperIcon);
					setTimeout(() => {
						setScore(score + 1);
					}, 3000);
				} else if (computerMove === "s") {
					setResult("Tie");
					setComputerMoveImage(scissorsIcon);
				}
				break;
			default:
				setResult(result);
				break;
		}
	};

	const checkPlayersMoves = (gameState, setPlayerMoveImage, setComputerMoveImage) => {
		if (gameState.p1 === "r") {
			setPlayerMoveImage(rockIcon);
		} else if (gameState.p1 === "p") {
			setPlayerMoveImage(paperIcon);
		} else if (gameState.p1 === "s") {
			setPlayerMoveImage(scissorsIcon);
		}

		if (gameState.p2 === "r") {
			setComputerMoveImage(rockIcon);
		} else if (gameState.p2 === "p") {
			setComputerMoveImage(paperIcon);
		} else if (gameState.p2 === "s") {
			setComputerMoveImage(scissorsIcon);
		}
	};

	return {
		generateComputerMove,
		checkPlayersMoves,
		checkOptions,
		playerMoveImage,
		setPlayerMoveImage,
		computerMoveImage,
		setComputerMoveImage,
	};
};

export default useFunctions;
