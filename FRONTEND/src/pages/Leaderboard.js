import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import back from "../images/arrow-back-outline.svg";
import useCheckContext from "../hooks/useCheckContext";
import useFunctions from "../hooks/useFunctions";

const Leaderboard = () => {
	const { scores, setScores, socket, getUserStats } = useCheckContext();
	const { getAllScores } = useFunctions();

	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		getAllScores(socket, setScores);
	}, []);

	const [renderRoutes, setRenderRoutes] = useState(false);

	useEffect(() => {
		setRenderRoutes(false);
		const timer = setTimeout(() => {
			setRenderRoutes(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{renderRoutes && (
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
							to={`/p/${user?.username}`}
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
							<p>Win %</p>
						</div>

						<ul>
							{scores?.map((score) => (
								<Link
									to={`/p/${score?.username}`}
									title={score?.username}
									style={{
										textDecoration: "none",
										backgroundColor:
											user?.username === score?.username &&
											"hsl(349, 70%, 56%)",
										color: user?.username === score?.username && "black",
									}}
									className="user"
									key={score?.username}
									onClick={() => {
										getUserStats(score?.username);
									}}
								>
									<p
										style={{
											fontWeight:
												user?.username === score?.username
													? "bold"
													: "normal",
										}}
									>
										{score?.username}
									</p>
									<span
										title={score?.wins}
										style={{ color: "orange" }}
									>
										{score?.wins}
									</span>
									<span
										title={score?.wins}
										style={{ color: "orange" }}
									>
										{((score?.wins / score.games_played) * 100).toFixed(2)}%
									</span>
								</Link>
							))}
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export default Leaderboard;
