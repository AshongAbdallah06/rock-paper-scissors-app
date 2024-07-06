import React from "react";
import logo from "../images/logo.svg";

const ScoreBoard = () => {
	return (
		<section class="scoreBoard">
			<div class="imgCont">
				<img
					src={logo}
					alt=""
				/>
			</div>
			<div class="score">
				<p>score</p>
				<p>12</p>
			</div>
		</section>
	);
};

export default ScoreBoard;
