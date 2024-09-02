import React from "react";
import profileIcon from "../images/person-circle-outline.svg";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";

const Profile = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const { stats } = useCheckContext();

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
						<p className="number">{stats.gamesPlayed}</p>
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
