import React from "react";
import logo from "../images/logo.svg";
import plane from "../images/paper-plane-outline.svg";
import useCheckContext from "../hooks/useCheckContext";

const ScoreBoard = ({ chatIsShowing, setChatIsShowing }) => {
	const { score, p1Score, p2Score, gameState, isOnePlayer } = useCheckContext();

	return (
		<div>
			<section className="scoreBoard">
				<div className="imgCont">
					<img
						src={logo}
						alt="logo"
					/>
				</div>
				{isOnePlayer ? (
					<div className="score">
						<p>score</p>
						<p>{score}</p>
					</div>
				) : (
					<div className="p2">
						<div className="score">
							<p>Player1</p>
							<p>{p1Score}</p>
						</div>
						<div className="score">
							<p>Player2</p>
							<p>{p2Score}</p>
						</div>
					</div>
				)}
			</section>

			{!isOnePlayer && !chatIsShowing ? (
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
			) : (
				""
			)}
		</div>
	);
};

export default ScoreBoard;
