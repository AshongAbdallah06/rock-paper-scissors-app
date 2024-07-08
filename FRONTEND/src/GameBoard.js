import React, { useEffect, useState } from "react";
import Paper from "./components/Paper";
import Scissors from "./components/Scissors";
import Rock from "./components/Rock";
import AfterChoice from "./components/AfterChoice";
import MakingMove from "./components/MakingMove";
import useCheckContext from "./hooks/useCheckContext";

const GameBoard = () => {
	const { playerMove, computerMove } = useCheckContext();
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
					<Paper onclick={(e) => console(e.target)} />

					<Scissors />

					<Rock />
				</div>
			)}

			{playerMove && computerMove ? !showAfterChoice ? <MakingMove /> : <AfterChoice /> : ""}
		</section>
	);
};

export default GameBoard;
