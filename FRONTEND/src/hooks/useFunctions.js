import scissorsIcon from "../images/icon-scissors.svg";
import paperIcon from "../images/icon-paper.svg";
import rockIcon from "../images/icon-rock.svg";
import lizardIcon from "../images/icon-lizard.svg";
import spockIcon from "../images/icon-spock.svg";
import { useState } from "react";

const useFunctions = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const bonus = JSON.parse(localStorage.getItem("bonus"));

	// Generate the computer's move
	const generateComputerMove = (setComputerMove) => {
		const randomNumber = Math.floor(Math.random() * (bonus ? 5 : 3));

		if (!bonus) {
			if (randomNumber === 0) {
				setComputerMove("r");
			} else if (randomNumber === 1) {
				setComputerMove("p");
			} else {
				setComputerMove("s");
			}
		} else if (bonus) {
			if (randomNumber === 0) {
				setComputerMove("r");
			} else if (randomNumber === 1) {
				setComputerMove("p");
			} else if (randomNumber === 2) {
				setComputerMove("s");
			} else if (randomNumber === 3) {
				setComputerMove("l");
			} else {
				setComputerMove("sp");
			}
		}
	};

	// Images for player and computer moves
	const [playerMoveImage, setPlayerMoveImage] = useState("");
	const [computerMoveImage, setComputerMoveImage] = useState("");

	// For single player mode
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
		if (!bonus) {
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
		} else if (bonus) {
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
					} else if (computerMove === "l") {
						setResult("Player wins");
						setComputerMoveImage(lizardIcon);
						setTimeout(() => {
							setScore(score + 1);
						}, 3000);
					} else if (computerMove === "sp") {
						setResult("Computer wins");
						setComputerMoveImage(spockIcon);
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
					} else if (computerMove === "l") {
						setResult("Computer wins");
						setComputerMoveImage(lizardIcon);
					} else if (computerMove === "sp") {
						setResult("Player wins");
						setComputerMoveImage(spockIcon);
						setTimeout(() => {
							setScore(score + 1);
						}, 3000);
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
					} else if (computerMove === "l") {
						setResult("Player wins");
						setComputerMoveImage(lizardIcon);
						setTimeout(() => {
							setScore(score + 1);
						}, 3000);
					} else if (computerMove === "sp") {
						setResult("Computer wins");
						setComputerMoveImage(spockIcon);
					}
					break;
				case "l":
					setPlayerMoveImage(lizardIcon);
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
						setResult("Computer wins");
						setComputerMoveImage(scissorsIcon);
					} else if (computerMove === "l") {
						setResult("Tie");
						setComputerMoveImage(lizardIcon);
					} else if (computerMove === "sp") {
						setResult("Player wins");
						setTimeout(() => {
							setScore(score + 1);
						}, 3000);
						setComputerMoveImage(spockIcon);
					}
					break;
				case "sp":
					setPlayerMoveImage(spockIcon);
					if (computerMove === "r") {
						setResult("Player wins");
						setComputerMoveImage(rockIcon);
						setTimeout(() => {
							setScore(score + 1);
						}, 3000);
					} else if (computerMove === "p") {
						setResult("Computer wins");
						setComputerMoveImage(paperIcon);
					} else if (computerMove === "s") {
						setResult("Player wins");
						setComputerMoveImage(scissorsIcon);
						setTimeout(() => {
							setScore(score + 1);
						}, 3000);
					} else if (computerMove === "l") {
						setResult("Computer wins");
						setComputerMoveImage(lizardIcon);
					} else if (computerMove === "sp") {
						setResult("Tie");
						setComputerMoveImage(spockIcon);
					}
					break;
				default:
					setResult(result);
					break;
			}
		}
	};

	// For dual player mode
	const checkPlayersMoves = (gameState, setPlayerMoveImage, setComputerMoveImage) => {
		if (gameState.p1 === "r") {
			setPlayerMoveImage(rockIcon);
		} else if (gameState.p1 === "p") {
			setPlayerMoveImage(paperIcon);
		} else if (gameState.p1 === "s") {
			setPlayerMoveImage(scissorsIcon);
		} else if (gameState.p1 === "l") {
			setPlayerMoveImage(lizardIcon);
		} else if (gameState.p1 === "sp") {
			setPlayerMoveImage(spockIcon);
		}

		if (gameState.p2 === "r") {
			setComputerMoveImage(rockIcon);
		} else if (gameState.p2 === "p") {
			setComputerMoveImage(paperIcon);
		} else if (gameState.p2 === "s") {
			setComputerMoveImage(scissorsIcon);
		} else if (gameState.p2 === "l") {
			setComputerMoveImage(lizardIcon);
		} else if (gameState.p2 === "sp") {
			setComputerMoveImage(spockIcon);
		}
	};

	const sendMoveAck = (socket) => {
		socket.emit("move-made", user.username);
	};

	// Join room
	const joinRoom = (socket, roomID, setLeftRoom) => {
		socket.emit("join_room", `${roomID}-${bonus ? "bonus" : "normal"}`);

		setLeftRoom(false);

		socket.emit("clearMoves");
	};

	// Leave Room

	const leaveRoom = (socket, setLeftRoom) => {
		socket.emit("leaveRoom", user.username);

		setLeftRoom(true);
	};
	return {
		generateComputerMove,
		checkPlayersMoves,
		checkOptions,
		playerMoveImage,
		setPlayerMoveImage,
		computerMoveImage,
		setComputerMoveImage,
		sendMoveAck,
		joinRoom,
		leaveRoom,
	};
};

export default useFunctions;
