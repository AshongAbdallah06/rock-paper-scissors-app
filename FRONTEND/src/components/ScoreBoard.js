import React from "react";
import logo from "../images/logo.svg";
import plane from "../images/paper-plane-outline.svg";
import useCheckContext from "../hooks/useCheckContext";

const ScoreBoard = ({ chatIsShowing, setChatIsShowing }) => {
	const { score, gameState } = useCheckContext();

	return (
		<div>
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
			{/* <h3 style={{ textAlign: "center", color: "white" }}>
				{(!gameState.p1 || !gameState.p2) && "Make your move"}
			</h3> */}

			{!chatIsShowing && (
				<div
					className="menu"
					onClick={() => setChatIsShowing(!chatIsShowing)}
					title="Messages"
				>
					<img
						src={plane}
						alt="messages"
					/>
				</div>
			)}
		</div>
	);
};

export default ScoreBoard;
