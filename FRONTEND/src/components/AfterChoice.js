import { useEffect, useState } from "react";
import useCheckContext from "../hooks/useCheckContext";

const AfterChoice = ({ bonusState }) => {
	const {
		playerMove,
		setPlayerMove,
		playerMoveImage,
		computerMoveImage,
		result,
		setComputerMove,
		setResult,
		isOnePlayer,
		gameState,
		clearMoves,
	} = useCheckContext();

	// Get usernames
	const usernames = JSON.parse(localStorage.getItem("usernames"));
	const [p1Username, setP1Username] = useState("");
	const [p2Username, setP2Username] = useState("");

	useEffect(() => {
		if (usernames) {
			if (!usernames) {
				alert("There are no usernames assigned for both users");

				return;
			}

			setP1Username(usernames?.p1Username);
			setP2Username(usernames?.p2Username);
		}
	}, []);

	const user = JSON.parse(localStorage.getItem("user"));

	return (
		<div className="Desktop-step2">
			<div className="you-picked">
				{/* <h1>{isOnePlayer ? "YOU PICKED" : "PLAYER 1 PICKED"}</h1> */}
				<h1>
					{isOnePlayer
						? "YOU PICKED"
						: `${p1Username === user.username ? "You" : p1Username} PICKED`}
				</h1>
				<div
					className={`picked ${
						isOnePlayer
							? result === "Player wins"
								? "winner"
								: ""
							: result === "Player1 wins"
							? "winner"
							: ""
					}`}
				>
					{!bonusState ? (
						<img
							src={playerMoveImage}
							alt={
								(playerMove === "r" && "rock") ||
								(playerMove === "p" && "paper") ||
								(playerMove === "s" && "scissors")
							}
						/>
					) : (
						<img
							src={playerMoveImage}
							alt={
								(playerMove === "r" && "rock") ||
								(playerMove === "p" && "paper") ||
								(playerMove === "s" && "scissors") ||
								(playerMove === "l" && "lizard") ||
								(playerMove === "sp" && "spock")
							}
						/>
					)}
				</div>
			</div>

			<div className="results">
				<h1>
					{isOnePlayer
						? result === "Computer wins" && "YOU LOSE"
						: gameState.result === "Player2 wins" && `${p2Username} wins`}

					{isOnePlayer
						? result === "Player wins" && "YOU WIN"
						: gameState.result === "Player1 wins" && `${p1Username} wins`}

					{isOnePlayer ? result === "Tie" && "TIE" : gameState.result === "Tie" && "Tie"}
				</h1>
				<button
					onClick={() => {
						setPlayerMove(null);
						setComputerMove(null);
						setResult("");

						clearMoves();
					}}
				>
					PLAY AGAIN
				</button>
			</div>

			<div className="house-picked">
				{/* <h1>{isOnePlayer ? "THE HOUSE PICKED" : "PLAYER 2 PICKED"}</h1> */}
				<h1>
					{isOnePlayer
						? "THE HOUSE PICKED"
						: `${p2Username === user.username ? "You" : p2Username} PICKED`}
				</h1>
				<div
					className={`hPicked ${
						isOnePlayer
							? result === "Computer wins"
								? "winner"
								: ""
							: result === "Player2 wins"
							? "winner"
							: ""
					}`}
				>
					{!bonusState ? (
						<img
							src={computerMoveImage}
							alt={
								(playerMove === "r" && "rock") ||
								(playerMove === "p" && "paper") ||
								(playerMove === "s" && "scissors")
							}
						/>
					) : (
						<img
							src={computerMoveImage}
							alt={
								(playerMove === "r" && "rock") ||
								(playerMove === "p" && "paper") ||
								(playerMove === "s" && "scissors") ||
								(playerMove === "l" && "lizard") ||
								(playerMove === "sp" && "spock")
							}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default AfterChoice;
