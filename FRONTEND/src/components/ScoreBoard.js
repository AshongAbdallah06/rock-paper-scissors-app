import React from "react";
import logo from "../images/logo.svg";

const ScoreBoard = () => {
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
				<p>12</p>
			</div>
		</section>
	);
};

export default ScoreBoard;
