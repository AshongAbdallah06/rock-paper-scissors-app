import React, { useEffect, useState } from "react";
import profileIcon from "../images/person-circle-outline.svg";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import Axios from "axios";

const Profile = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const [stats, setStats] = useState({
		score: 0,
		games_played: 0,
		last_played: "2024-08-30T00:00:00.000Z",
		loses: 0,
		ties: 0,
		wins: 0,
	});

	const getUserStats = async () => {
		try {
			console.log("🚀 ~ getScores ~ Attempting to fetch scores");
			const res = await Axios.get(`http://localhost:4001/api/user/stats/${user.username}`);
			const data = res.data[0];

			setStats({
				score: data.score,
				games_played: data.games_played,
				last_played: data.last_played,
				loses: data.loses,
				ties: data.ties,
				wins: data.wins,
			});
			console.log("🚀 ~ getScores ~ Success:", data);
		} catch (error) {
			console.error("🚀 ~ getScores ~ error:", error);
		}
	};

	useEffect(() => {
		getUserStats();
	}, []);

	return (
		<>
			<Link
				to="/"
				className="header"
			>
				<img
					src={logo}
					alt="logo"
				/>
			</Link>

			<div className="profile-container">
				<div className="profile">
					<img
						src={profileIcon}
						className="profile-icon"
						alt="profile-icon"
					/>
					<p className="name">
						{user.username} ({stats.score})
					</p>
				</div>

				<div className="stats">
					<div className="card">
						<p>Games Played</p>
						<p className="number">{stats.games_played}</p>
					</div>
					<div className="card">
						<p>Wins</p>
						<p className="number">{stats?.wins}</p>
					</div>
					<div className="card">
						<p>Ties</p>
						<p className="number">{stats.ties}</p>
					</div>
					<div className="card">
						<p>Loses</p>
						<p className="number">{stats.loses}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
