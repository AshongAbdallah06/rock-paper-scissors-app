import React from "react";
import Paper from "./components/Paper";
import Scissors from "./components/Scissors";
import Rock from "./components/Rock";

const GameBoard = () => {
	return (
		<section class="Gboard">
			<div class="gameBoard">
				<Paper />

				<Scissors />

				<Rock />
			</div>
		</section>
	);
};

export default GameBoard;
