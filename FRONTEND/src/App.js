import "./App.css";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./GameBoard";
import { createContext, useEffect, useState } from "react";
import scissorsIcon from "./images/icon-scissors.svg";
import paperIcon from "./images/icon-paper.svg";
import rockIcon from "./images/icon-rock.svg";
import Dialog from "./components/Dialog";

export const GameContext = createContext();
function App() {
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
			case "r":
				setPlayerMoveImage(rockIcon);

				if (playerMove === "r" && computerMove === "r") {
					setResult("Tie");
					setComputerMoveImage(rockIcon);
				} else if (playerMove === "r" && computerMove === "p") {
					setResult("Computer wins");
					setComputerMoveImage(paperIcon);
				} else if (playerMove === "r" && computerMove === "s") {
					setResult("Player wins");
					setComputerMoveImage(scissorsIcon);
					setTimeout(() => {
						setScore(score + 1);
					}, 3000);
				}
				break;
			case "p":
				setPlayerMoveImage(paperIcon);
				if (playerMove === "p" && computerMove === "r") {
					setResult("Player wins");
					setComputerMoveImage(rockIcon);
					setTimeout(() => {
						setScore(score + 1);
					}, 3000);
				} else if (playerMove === "p" && computerMove === "p") {
					setResult("Tie");
					setComputerMoveImage(paperIcon);
				} else if (playerMove === "p" && computerMove === "s") {
					setResult("Computer wins");
					setComputerMoveImage(scissorsIcon);
				}

				break;
			case "s":
				setPlayerMoveImage(scissorsIcon);
				if (playerMove === "s" && computerMove === "r") {
					setResult("Computer wins");
					setComputerMoveImage(rockIcon);
				} else if (playerMove === "s" && computerMove === "p") {
					setResult("Player wins");
					setComputerMoveImage(paperIcon);
					setTimeout(() => {
						setScore(score + 1);
					}, 3000);
				} else if (playerMove === "s" && computerMove === "s") {
					setResult("Tie");
					setComputerMoveImage(scissorsIcon);
				}
				break;
			default:
				setResult(result);
				break;
		}
	};

	useEffect(() => {
		checkOptions();
	}, [playerMove, computerMove]);

	// Save score to localStorage
	useEffect(() => {
		localStorage.setItem("score", JSON.stringify(score));
	}, [score]);

	return (
		<GameContext.Provider
			value={{
				result,
				setResult,
				score,
				setScore,
				playerMove,
				setPlayerMove,
				computerMove,
				setComputerMove,
				playerMoveImage,
				computerMoveImage,
			}}
		>
			<div>
				<ScoreBoard />

				<GameBoard />

				<Dialog />
			</div>
		</GameContext.Provider>
	);
}

export default App;
