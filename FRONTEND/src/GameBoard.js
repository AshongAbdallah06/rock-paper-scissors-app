import React, { useEffect, useState } from "react";
import Paper from "./components/Paper";
import Scissors from "./components/Scissors";
import Rock from "./components/Rock";
import AfterChoice from "./components/AfterChoice";
import MakingMove from "./components/MakingMove";
import useCheckContext from "./hooks/useCheckContext";
import rockIcon from "./images/icon-rock.svg";
import paperIcon from "./images/icon-paper.svg";
import scissorsIcon from "./images/icon-scissors.svg";
import lizardIcon from "./images/icon-lizard.svg";
import spockIcon from "./images/icon-spock.svg";
import LoadingDots from "./components/LoadingDots";
import Lizard from "./components/bonus/Lizard";
import Spock from "./components/bonus/Spock";

const GameBoard = () => {
	const { playerMove, computerMove, isOnePlayer } = useCheckContext();
	const [showAfterChoice, setShowAfterChoice] = useState(null);

	useEffect(() => {
		setShowAfterChoice(false);
		if (playerMove && computerMove) {
			setTimeout(() => {
				setShowAfterChoice(true);
			}, 2000);
		}
	}, [playerMove, computerMove]);

	const bonus = JSON.parse(localStorage.getItem("bonus"));

	return (
		<section className="Gboard">
			{!playerMove && !computerMove && (
				<div className={bonus ? "gameBoard-bonus" : "gameBoard"}>
					<Paper />

					<Scissors />

					<Rock />

					{bonus && (
						<>
							<Lizard />

							<Spock />
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
						{!bonus ? (
							<img
								src={
									(playerMove === "r" && rockIcon) ||
									(playerMove === "p" && paperIcon) ||
									(playerMove === "s" && scissorsIcon)
								}
								alt={
									(playerMove === "r" && "rock") ||
									(playerMove === "p" && "paper") ||
									(playerMove === "s" && "scissors")
								}
							/>
						) : (
							<img
								src={
									(playerMove === "r" && rockIcon) ||
									(playerMove === "p" && paperIcon) ||
									(playerMove === "s" && scissorsIcon) ||
									(playerMove === "l" && lizardIcon) ||
									(playerMove === "sp" && spockIcon)
								}
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
				</span>
			)}

			{playerMove && computerMove ? !showAfterChoice ? <MakingMove /> : <AfterChoice /> : ""}
		</section>
	);
};

export default GameBoard;
