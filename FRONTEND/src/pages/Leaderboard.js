import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import logo from "../images/logo.svg";
import back from "../images/arrow-back-outline.svg";
import LoadingDots from "../components/LoadingDots";

const Leaderboard = () => {
	const [scores, setScores] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const user = JSON.parse(localStorage.getItem("user"));

	const getScores = async () => {
		try {
			console.log("🚀 ~ getScores ~ Attempting to fetch scores");
			const res = await Axios.get("http://localhost:4001/api/user/scores");
			const data = res.data;
			console.log("🚀 ~ getScores ~ Success:", data);

			setScores(data);

			setLoading(false);
			setError(null);
		} catch (error) {
			setLoading(false);
			setError({ msg: "Error loading scores" });
			console.error("🚀 ~ getScores ~ error:", error);
		}
	};

	useEffect(() => {
		let loadingTimeout;
		let interval;

		const startLoadingTimeout = () => {
			loadingTimeout = setTimeout(() => {
				if (loading) {
					setError({ msg: "Error loading scores 😞" });
				}
			}, 5000);
		};

		getScores();
		startLoadingTimeout();

		interval = setInterval(() => {
			getScores();
		}, 60000);

		return () => {
			clearInterval(interval);
			clearTimeout(loadingTimeout);
		};
	}, [loading]);

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
					{loading && !error && (
						<p className="error-loading">
							Loading
							<LoadingDots />
							😁
						</p>
					)}
					{error && <p className="error-loading">{error.msg}</p>}
					{scores?.map((score) => (
						<li
							title={score.username}
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
								title={score.score}
								style={{ color: "orange" }}
							>
								{score.score}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Leaderboard;
