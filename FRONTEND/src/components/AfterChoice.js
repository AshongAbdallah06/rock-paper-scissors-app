import useCheckContext from "../hooks/useCheckContext";

const AfterChoice = () => {
	const {
		playerMove,
		computerMove,
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

	return (
		<div className="Desktop-step2">
			<div className="you-picked">
				<h1>{isOnePlayer ? "YOU PICKED" : "PLAYER 1 PICKED"}</h1>
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
					<img
						src={playerMoveImage}
						alt={
							(playerMove === "r" && "rock") ||
							(playerMove === "p" && "paper") ||
							(playerMove === "s" && "scissors")
						}
					/>
				</div>
			</div>

			<div className="results">
				<h1>
					{isOnePlayer
						? result === "Computer wins" && "YOU LOSE"
						: gameState.result === "Player2 wins" && "Player2 wins"}

					{isOnePlayer
						? result === "Player wins" && "YOU WIN"
						: gameState.result === "Player1 wins" && "Player1 wins"}

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
				<h1>{isOnePlayer ? "THE HOUSE PICKED" : "PLAYER 2 PICKED"}</h1>
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
					<img
						src={computerMoveImage}
						alt={
							(computerMove === "r" && "rock") ||
							(computerMove === "p" && "paper") ||
							(computerMove === "s" && "scissors")
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default AfterChoice;
