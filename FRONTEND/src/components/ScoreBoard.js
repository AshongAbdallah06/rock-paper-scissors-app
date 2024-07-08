import React from "react";
import logo from "../images/logo.svg";
import useCheckContext from "../hooks/useCheckContext";

const ScoreBoard = () => {
	const { score } = useCheckContext();

	return (
		<section className="scoreBoard">
			<div className="imgCont">
				<img
					src={logo}
					alt="logo"
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
