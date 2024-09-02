import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import back from "../images/arrow-back-outline.svg";
import useCheckContext from "../hooks/useCheckContext";
import useFunctions from "../hooks/useFunctions";

const Leaderboard = () => {
	const { socket, stats, scores, setScores } = useCheckContext();
	const { getAllScores } = useFunctions();

	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		socket.emit("getAllScores");

		getAllScores(socket, setScores);
	}, []);

	useEffect(() => {
		getAllScores(socket, setScores);
	}, [scores]);

	return (
		<div className="leaderboard">
			<Link
				to="/"
				className="header"
			>
				<img
					src={logo}
					alt="logo"
				/>
			</Link>

			<header>
				<Link
					to="/"
					className="go-back"
				>
					<img
						src={back}
						alt="back"
						className="back"
					/>
					Go back
				</Link>

				<Link
					to="/profile"
					className="my-profile"
				>
					View Profile
				</Link>
			</header>
			<div className="leaderboard-container">
				<h1>Leaderboard</h1>

				<div className="header-labels">
					<p>Username</p>
					<p>Score</p>
				</div>

				<ul>
					{scores?.map((score) => (
						<li
							title={score?.username}
							style={{
								backgroundColor:
									user?.username === score?.username && "hsl(349, 70%, 56%)",
								color: user?.username === score?.username && "black",
							}}
							className="user"
							key={score?.username}
						>
							<p
								style={{
									fontWeight:
										user?.username === score?.username ? "bold" : "normal",
								}}
							>
								{score?.username}
							</p>
							{user?.username === score?.username && (
								<p
									style={{
										fontWeight: "bold",
									}}
								>
									You
								</p>
							)}
							<span
								title={score?.wins}
								style={{ color: "orange" }}
							>
								{score?.wins}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Leaderboard;
