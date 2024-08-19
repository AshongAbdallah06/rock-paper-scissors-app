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
import LoadingDots from "./components/LoadingDots";

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

	return (
		<section className="Gboard">
			{!playerMove && !computerMove && (
				<div className="gameBoard">
					<Paper />

					<Scissors />

					<Rock />
				</div>
			)}
			{!isOnePlayer && playerMove && !computerMove && (
				<span className="stale">
					<h3>
						Waiting for opponent's move
						<LoadingDots />
					</h3>
					<div className="picked">
						<img
							src={
								(playerMove === "r" && rockIcon) ||
								(playerMove === "p" && paperIcon) ||
								(playerMove === "s" && scissorsIcon)
							}
							alt="rock"
						/>
					</div>
				</span>
			)}

			{playerMove && computerMove ? !showAfterChoice ? <MakingMove /> : <AfterChoice /> : ""}
		</section>
	);
};

export default GameBoard;
