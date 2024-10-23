import React, { FC } from "react";
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
	} = useContextProvider();

	return (
		<div className="Desktop-step2">
			<div className="you-picked">
				{/* <h1>{isOnePlayer ? "YOU PICKED" : "PLAYER 1 PICKED"}</h1> */}
				<h1>
					{isOnePlayer
						? "YOU PICKED"
						: `${p1Username === user?.username ? "You" : p1Username} Picked`}
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
						: gameState.result === "Player1 wins" &&
						  `${p1Username === user?.username ? "YOU WIN" : "YOU LOSE"}`}

					{isOnePlayer
						? result === "Computer wins" && "YOU LOSE"
						: gameState.result === "Player2 wins" &&
						  `${p2Username === user?.username ? "YOU WIN" : "YOU LOSE"}`}

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
						: `${p2Username === user?.username ? "You" : p2Username} Picked`}
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
