import React, { useContext } from "react";
import logo from "../images/logo.svg";
import { GameContext } from "../App";

const ScoreBoard = () => {
	const { score } = useContext(GameContext);
	return (
		<section className="scoreBoard">
			<div className="imgCont">
				<img
					src={logo}
					alt=""
				/>
			</div>
			<div className="score">
				<p>score</p>
				<p>{score}</p>
			</div>
		</section>
	);
};

export default ScoreBoard;
