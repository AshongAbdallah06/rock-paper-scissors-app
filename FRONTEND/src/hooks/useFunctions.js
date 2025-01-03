import Axios from "axios";
import { useState } from "react";
import lizardIcon from "../images/icon-lizard.svg";
import paperIcon from "../images/icon-paper.svg";
import rockIcon from "../images/icon-rock.svg";
import scissorsIcon from "../images/icon-scissors.svg";
import spockIcon from "../images/icon-spock.svg";

const useFunctions = () => {
	const user = JSON.parse(localStorage.getItem("user"));

	// Generate the computer's move
	const generateComputerMove = (setComputerMove, bonusState) => {
		const randomNumber = Math.floor(Math.random() * (bonusState ? 5 : 3));

		if (!bonusState) {
			if (randomNumber === 0) {
				setComputerMove("r");
			} else if (randomNumber === 1) {
				setComputerMove("p");
			} else {
				setComputerMove("s");
			}
		} else if (bonusState) {
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
		bonusState
	) => {
		if (!bonusState) {
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
					}
					break;
				case "p":
					setPlayerMoveImage(paperIcon);
					if (computerMove === "r") {
						setResult("Player wins");
						setComputerMoveImage(rockIcon);
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
					} else if (computerMove === "s") {
						setResult("Tie");
						setComputerMoveImage(scissorsIcon);
					}
					break;
				default:
					setResult(result);
					break;
			}
		} else if (bonusState) {
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
					} else if (computerMove === "l") {
						setResult("Player wins");
						setComputerMoveImage(lizardIcon);
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
					} else if (computerMove === "s") {
						setResult("Tie");
						setComputerMoveImage(scissorsIcon);
					} else if (computerMove === "l") {
						setResult("Player wins");
						setComputerMoveImage(lizardIcon);
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
					} else if (computerMove === "s") {
						setResult("Computer wins");
						setComputerMoveImage(scissorsIcon);
					} else if (computerMove === "l") {
						setResult("Tie");
						setComputerMoveImage(lizardIcon);
					} else if (computerMove === "sp") {
						setResult("Player wins");
						setComputerMoveImage(spockIcon);
					}
					break;
				case "sp":
					setPlayerMoveImage(spockIcon);
					if (computerMove === "r") {
						setResult("Player wins");
						setComputerMoveImage(rockIcon);
					} else if (computerMove === "p") {
						setResult("Computer wins");
						setComputerMoveImage(paperIcon);
					} else if (computerMove === "s") {
						setResult("Player wins");
						setComputerMoveImage(scissorsIcon);
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
	const joinRoom = (socket, roomID, bonusState) => {
		socket.emit("join-room", {
			id: `${roomID}-${bonusState ? "bonus" : "normal"}`,
			username: user?.username,
		});

		socket.emit("clearMoves");
	};

	// Leave Room
	const leaveRoom = (socket) => {
		try {
			socket.emit("leave-room", user.username);
		} catch (error) {
			alert("Error Occurred. Check the console to see what occurred.");
			console.log("🚀 ~ leaveRoom ~ error:", error);
		}
	};

	const getAllScores = (socket, setScores) => {
		socket.emit("getAllScores");
		socket.on("getAllScores", (scores) => {
			setScores(scores);
		});

		return () => {
			socket.off("getAllScores");
		};
	};

	const logout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("usernames");
		localStorage.removeItem("selectedUser");
		localStorage.removeItem("token");

		window.location.href = "/login";
	};

	// For all stats of the current user in dual player mode
	const [allGamesPlayed, setAllGamesPlayed] = useState(0);
	const [allWins, setAllWins] = useState(0);
	const [allLosses, setAllLosses] = useState(0);
	const [allTies, setAllTies] = useState(0);

	let totalGamesPlayed = 0;
	let totalWins = 0;
	let totalLosses = 0;
	let totalTies = 0;

	const getAllDualPlayerStats = async (username) => {
		try {
			const response = await Axios.get(
				`https://rock-paper-scissors-app-iybf.onrender.com/api/user/stats/dual-player/${username}`
				// `http://localhost:4001/api/user/stats/dual-player/${username}`
			);

			const data = response.data;

			data.forEach((stat) => {
				if (stat.player1_username === user?.username) {
					totalWins += stat.player1_wins;
					totalLosses += stat.player1_losses;
				} else if (stat.player2_username === user?.username) {
					totalWins += stat.player2_wins;
					totalLosses += stat.player2_losses;
				}
				totalGamesPlayed += stat.games_played;
				totalTies += stat.ties;

				setAllGamesPlayed(totalGamesPlayed ? totalGamesPlayed : 0);
				setAllWins(totalWins ? totalWins : 0);
				setAllLosses(totalLosses ? totalLosses : 0);
				setAllTies(totalTies ? totalTies : 0);
			});
		} catch (err) {
			console.log(err);
		}
	};

	const getStorageItem = (itemName, returnItem) => {
		const storedItem = localStorage.getItem(itemName);
		try {
			return storedItem ? JSON.parse(storedItem) : returnItem;
		} catch (error) {
			console.error("Error parsing opt changes from localStorage:", error);
			return null; // Return null if parsing fails
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
		sendMoveAck,
		joinRoom,
		leaveRoom,
		getAllScores,
		logout,
		allGamesPlayed,
		allWins,
		allLosses,
		allTies,
		getAllDualPlayerStats,
		getStorageItem,
	};
};

export default useFunctions;
