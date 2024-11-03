import React from "react";
import useContextProvider from "../hooks/useContextProvider";

const AfterChoice = ({ bonusState }) => {
	const {
		playerMove,
		setPlayerMove,
		playerMoveImage,
		computerMove,
		computerMoveImage,
		result,
		setComputerMove,
		setResult,
		isOnePlayer,
		gameState,
		clearMoves,
		p1Username,
		p2Username,
		user,
		userExists,
	} = useContextProvider();

	return (
		<div className="Desktop-step2">
			<div className="you-picked">
				{/* <h1>{isOnePlayer ? "YOU PICKED" : "PLAYER 1 PICKED"}</h1> */}
				<h1>
					{isOnePlayer
						? "YOU PICKED"
						: `${
								userExists && p1Username === user?.username ? "You" : p1Username
						  } Picked`}
				</h1>
				<div
					className={`picked ${
						isOnePlayer
							? result === "Player wins"
								? "winner"
								: ""
							: user
							? result === "Player1 wins"
								? "winner"
								: ""
							: "Login to play dual player mode"
					}`}
				>
					{!bonusState ? (
						<img
							src={playerMoveImage || ""}
							alt={
								playerMove
									? (playerMove === "r" ? "rock" : "") ||
									  (playerMove === "p" ? "paper" : "") ||
									  (playerMove === "s" ? "scissors" : "")
									: ""
							}
						/>
					) : (
						<img
							src={playerMoveImage || ""}
							alt={
								(playerMove === "r" ? "rock" : "") ||
								(playerMove === "p" ? "paper" : "") ||
								(playerMove === "s" ? "scissors" : "") ||
								(playerMove === "l" ? "lizard" : "") ||
								(playerMove === "sp" ? "spock" : "")
							}
						/>
					)}
				</div>
			</div>

			<div className="results">
				<h1>
					{isOnePlayer
						? result === "Player wins" && "YOU WIN"
						: user
						? gameState.result === "Player1 wins" &&
						  `${p1Username === user?.username ? "YOU WIN" : "YOU LOSE"}`
						: "Login to play dual player mode"}

					{isOnePlayer
						? result === "Computer wins" && "YOU LOSE"
						: user
						? gameState.result === "Player2 wins" &&
						  `${p2Username === user?.username ? "YOU WIN" : "YOU LOSE"}`
						: "Login to play dual player mode"}

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
						: user
						? `${p2Username === user?.username ? "You" : p2Username} Picked`
						: "Login to play dual player mode"}
				</h1>
				<div
					className={`hPicked ${
						isOnePlayer
							? result === "Computer wins"
								? "winner"
								: ""
							: user
							? result === "Player2 wins"
								? "winner"
								: ""
							: "Login to play dual player mode"
					}`}
				>
					{!bonusState ? (
						<img
							src={computerMoveImage || ""}
							alt={
								computerMove
									? (computerMove === "r" ? "rock" : "") ||
									  (computerMove === "p" ? "paper" : "") ||
									  (computerMove === "s" ? "scissors" : "")
									: ""
							}
						/>
					) : (
						<img
							src={computerMoveImage || ""}
							alt={
								computerMove
									? (computerMove === "r" ? "rock" : "") ||
									  (computerMove === "p" ? "paper" : "") ||
									  (computerMove === "s" ? "scissors" : "") ||
									  (computerMove === "l" ? "lizard" : "") ||
									  (computerMove === "sp" ? "spock" : "")
									: ""
							}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default AfterChoice;
