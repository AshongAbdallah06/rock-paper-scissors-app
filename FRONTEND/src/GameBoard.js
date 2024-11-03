import React, { useEffect, useState } from "react";
import AfterChoice from "./components/AfterChoice";
import Lizard from "./components/bonus/Lizard";
import Spock from "./components/bonus/Spock";
import Loader from "./components/Loader";
import LoadingDots from "./components/LoadingDots";
import MakingMove from "./components/MakingMove";
import Paper from "./components/Paper";
import Rock from "./components/Rock";
import Scissors from "./components/Scissors";
import useContextProvider from "./hooks/useContextProvider";
import lizardIcon from "./images/icon-lizard.svg";
import paperIcon from "./images/icon-paper.svg";
import rockIcon from "./images/icon-rock.svg";
import scissorsIcon from "./images/icon-scissors.svg";
import spockIcon from "./images/icon-spock.svg";

const GameBoard = () => {
	const { playerMove, computerMove, isOnePlayer, bonusState } = useContextProvider();
	const [showAfterChoice, setShowAfterChoice] = useState(null);

	useEffect(() => {
		setShowAfterChoice(false);
		if (playerMove && computerMove) {
			setTimeout(() => {
				setShowAfterChoice(true);
			}, 2000);
		}
	}, [playerMove, computerMove]);

	return (
		<section className="Gboard">
			{bonusState === true || bonusState === false ? (
				<>
					{!playerMove && !computerMove && (
						<div className={bonusState === true ? "gameBoard-bonus" : "gameBoard"}>
							<Paper bonusState={bonusState} />

							<Scissors bonusState={bonusState} />

							<Rock bonusState={bonusState} />

							{bonusState === true && (
								<>
									<Lizard bonusState={bonusState} />

									<Spock bonusState={bonusState} />
								</>
							)}
						</div>
					)}

					{!isOnePlayer && playerMove && !computerMove && (
						<span className="stale">
							<h3>
								Waiting for opponent's move
								<LoadingDots />
							</h3>
							<div className="picked">
								{bonusState === false ? (
									<img
										src={
											(playerMove === "r" ? rockIcon : "") ||
											(playerMove === "p" ? paperIcon : "") ||
											(playerMove === "s" ? scissorsIcon : "")
										}
										alt={
											(playerMove === "r" ? "rock" : "") ||
											(playerMove === "p" ? "paper" : "") ||
											(playerMove === "s" ? "scissors" : "")
										}
									/>
								) : (
									<img
										src={
											(playerMove === "r" ? rockIcon : "") ||
											(playerMove === "p" ? paperIcon : "") ||
											(playerMove === "s" ? scissorsIcon : "") ||
											(playerMove === "l" ? lizardIcon : "") ||
											(playerMove === "sp" ? spockIcon : "")
										}
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
						</span>
					)}

					{playerMove && computerMove ? (
						!showAfterChoice ? (
							<MakingMove />
						) : (
							<AfterChoice bonusState={bonusState} />
						)
					) : (
						""
					)}
				</>
			) : (
				<Loader />
			)}
		</section>
	);
};

export default GameBoard;
