import React, { useEffect, useState } from "react";
import profileIcon from "../images/person-circle-outline.svg";
import logo from "../images/logo.svg";
import useCheckContext from "../hooks/useCheckContext";
import closeIcon from "../images/icon-close nav.svg";

const DualPlayerStats = ({ setShowDualPlayerStats }) => {
	const { getPlayerStats, dualPlayerStats } = useCheckContext();

	const usernames = JSON.parse(localStorage.getItem("usernames"));
	const user = JSON.parse(localStorage.getItem("user"));
	// const [data, setData] = useState(null)
	useEffect(() => {
		getPlayerStats(usernames?.p1Username, usernames?.p2Username);
	}, []);
	return (
		<div className="overlay">
			<img
				src={closeIcon}
				alt="close"
				className="close-icon"
				onClick={() => setShowDualPlayerStats(false)}
			/>

			<div className="stats-container">
				<div className="player">
					<div className="profile">
						<img
							src={profileIcon}
							className="profile-icon"
							alt="profile-icon"
						/>
						<p className="username">
							{(dualPlayerStats?.player1_username === user?.username && "You") ||
								dualPlayerStats?.player1_username}
						</p>
					</div>

					<div className="stats">
						<div className="card">
							<p>Wins</p>
							<p className="number">{dualPlayerStats?.player1_wins || 0}</p>
						</div>
						<div className="card">
							<p>Losses</p>
							<p className="number">{dualPlayerStats?.player1_losses || 0}</p>
						</div>
					</div>
				</div>

				<div className="player">
					<div className="profile">
						<img
							src={profileIcon}
							className="profile-icon"
							alt="profile-icon"
						/>
						<p className="username">
							{(dualPlayerStats?.player2_username === user?.username && "You") ||
								dualPlayerStats?.player2_username}
						</p>
					</div>

					<div className="stats">
						<div className="card">
							<p>Wins</p>
							<p className="number">{dualPlayerStats?.player2_wins || 0}</p>
						</div>
						<div className="card">
							<p>Losses</p>
							<p className="number">{dualPlayerStats?.player2_losses || 0}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="bottom">
				<div className="stats">
					<div className="card">
						<p>Ties</p>
						<p className="number">{dualPlayerStats?.ties || 0}</p>
					</div>
					<div className="card">
						<p>Games Played</p>
						<p className="number">{dualPlayerStats?.games_played || 0}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DualPlayerStats;
