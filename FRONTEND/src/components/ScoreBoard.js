import React, { useEffect } from "react";
import logo from "../images/logo.svg";
import plane from "../images/paper-plane-outline.svg";
import useCheckContext from "../hooks/useCheckContext";
import Axios from "axios";

const ScoreBoard = ({ chatIsShowing, setChatIsShowing }) => {
	const { score, p1Score, p2Score, isOnePlayer } = useCheckContext();
	const user = JSON.parse(localStorage.getItem("user"));

	const updateScore = async () => {
		try {
			await Axios.patch(`http://localhost:4001/api/user/scores/${user.username}`, { score });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		updateScore();
	}, [score]);

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
