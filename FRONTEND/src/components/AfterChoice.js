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
	} = useCheckContext();

	return (
		<div className="Desktop-step2">
			<div className="you-picked">
				<h1>YOU PICKED</h1>
				<div className={`picked ${result === "Player wins" ? "winner" : ""}`}>
					<img
						src={playerMoveImage}
						alt={playerMove}
					/>
				</div>
			</div>

			<div className="results">
				<h1>
					{result === "Computer wins" && "YOU LOSE"}
					{result === "Player wins" && "YOU WIN"}
					{result === "Tie" && "TIE"}
				</h1>
				<button
					onClick={() => {
						setPlayerMove(null);
						setComputerMove(null);
						setResult("");
					}}
				>
					PLAY AGAIN
				</button>
			</div>

			<div className="house-picked">
				<h1>THE HOUSE PICKED</h1>
				<div className={`hPicked ${result === "Computer wins" ? "winner" : ""}`}>
					<img
						src={computerMoveImage}
						alt={computerMove}
					/>
				</div>
			</div>
		</div>
	);
};

export default AfterChoice;
