import React from "react";
import Paper from "./components/Paper";
import Scissors from "./components/Scissors";
import Rock from "./components/Rock";
import AfterChoice from "./components/AfterChoice";

const GameBoard = () => {
	
	return (
		<section className="Gboard">
			<div className="gameBoard">
				<Paper onclick={e => console(e.target)} />

				<Scissors />

				<Rock />
			</div>

			<AfterChoice />
			
		</section>
	);
};

export default GameBoard;
