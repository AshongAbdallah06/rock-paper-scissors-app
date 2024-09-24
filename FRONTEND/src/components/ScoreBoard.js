import React, { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import useCheckContext from "../hooks/useCheckContext";

const ScoreBoard = () => {
	const { isOnePlayer, getUserStats, currentUserStats, dualPlayerStats, p1Username, p2Username } =
		useCheckContext();

	const user = JSON.parse(localStorage.getItem("user"));
	const [showPlayer1Score, setShowPlayer1Score] = useState(null);
	const [showPlayer2Score, setShowPlayer2Score] = useState(null);

	useEffect(() => {
		if (p1Username && p2Username) {
			setShowPlayer1Score(true);
			setShowPlayer2Score(true);
		} else {
			setShowPlayer2Score(false);
			setShowPlayer1Score(false);
		}
	}, [p1Username, p2Username]);

	useEffect(() => {
		if (isOnePlayer) {
			getUserStats(user?.username);
		}
	}, [isOnePlayer, user?.username]);

	return (
		<>
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
						<p>{currentUserStats?.wins || 0}</p>
					</div>
				) : (
					<div className="p2">
						<div className="score">
							<p>
								{p1Username === user?.username ? "You" : p1Username}

								{p1Username === null && (
									<span style={{ color: "gray" }}>Unavailable</span>
								)}
							</p>
							<p>
								{showPlayer1Score ? (
									p1Username !== null &&
									p2Username !== null &&
									dualPlayerStats?.player1_username === p1Username ? (
										dualPlayerStats?.player1_wins
									) : (
										dualPlayerStats?.player2_wins
									)
								) : (
									<span style={{ color: "gray" }}>0</span>
								)}
							</p>
						</div>

						<div className="score">
							<p>
								{p2Username === user?.username ? "You" : p2Username}

								{p2Username === null && (
									<span style={{ color: "gray" }}>Unavailable</span>
								)}
								{/* Create a warning left sign */}
							</p>
							<p>
								{showPlayer2Score ? (
									p2Username !== null &&
									p1Username !== null &&
									dualPlayerStats?.player2_username === p2Username ? (
										dualPlayerStats?.player2_wins
									) : (
										dualPlayerStats?.player1_wins
									)
								) : (
									<span style={{ color: "gray" }}>0</span>
								)}
							</p>
						</div>
					</div>
				)}
			</section>
		</>
	);
};

export default ScoreBoard;
