import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useContextProvider from "../hooks/useContextProvider";
import closeIcon from "../images/icon-close nav.svg";

const DualPlayerStats = ({ setShowDualPlayerStats }) => {
	const { getPlayerStats, dualPlayerStats, p1Username, p2Username, user, userExists } =
		useContextProvider();

	const [twoUsersDetected, setTwoUsersDetected] = useState(null);

	const [opponentProfile, setOpponentProfile] = useState(null);
	const getUserProfiles = async () => {
		try {
			const res = await Axios.post(
				"https://rock-paper-scissors-app-iybf.onrender.com/api/user/profiles",
				{
					username:
						dualPlayerStats?.player1_username !== user?.username
							? dualPlayerStats?.player1_username
							: dualPlayerStats?.player2_username,
				}
			);
			const userData = res.data;

			if (userData) {
				setOpponentProfile(userData[0]);
			}
		} catch (error) {
			if (error?.response?.status === 413) {
				alert("File too large");
			}
			console.log(error);
		}
	};

	useEffect(() => {
		if (userExists) {
			if (p1Username && p2Username) {
				getPlayerStats(p1Username, p2Username);
				setTwoUsersDetected(true);
				getUserProfiles();
			} else {
				setTwoUsersDetected(false);
			}
		}
	}, []);

	return (
		<div className="overlay">
			<img
				src={closeIcon}
				alt="close"
				className="close-icon"
				onClick={() => setShowDualPlayerStats(false)}
			/>

			{twoUsersDetected && p1Username && p2Username ? (
				<>
					<div className="profile-container two-player">
						<div className="top">
							<div>
								<div className="profile-header">
									<img
										src={
											user?.username === dualPlayerStats?.player1_username
												? user?.image || ""
												: opponentProfile?.image || ""
										}
										alt="Profile"
										className="profile-pic"
									/>
									<Link
										className="profile-name"
										to={`/p/${dualPlayerStats?.player1_username}`}
									>
										{(dualPlayerStats?.player1_username === user?.username &&
											"You") ||
											dualPlayerStats?.player1_username}
										,{" "}
										<span className="age">
											{user?.username === dualPlayerStats?.player1_username
												? user?.age
												: opponentProfile?.age}
										</span>
									</Link>
									<p className="profile-location">
										{user?.username === dualPlayerStats?.player1_username
											? user?.location
											: opponentProfile?.location || "From Earth"}
									</p>
								</div>

								<div className="profile-stats two-player">
									<div className="stat-item two-player">
										<div>
											<h3>{dualPlayerStats?.player1_wins || 0}</h3>
											<p>Wins</p>
										</div>
										<div>
											<h3>{dualPlayerStats?.player1_losses || 0}</h3>
											<p>Losses</p>
										</div>
									</div>
								</div>
							</div>

							<div className="divider"></div>

							<div>
								<div className="profile-header">
									<img
										src={
											user?.username === dualPlayerStats?.player2_username
												? user?.image || ""
												: opponentProfile?.image || ""
										}
										alt="Profile"
										className="profile-pic"
									/>
									<Link
										to={`/p/${dualPlayerStats?.player2_username}`}
										className="profile-name"
									>
										{(dualPlayerStats?.player2_username === user?.username &&
											"You") ||
											dualPlayerStats?.player2_username}
										,{" "}
										<span className="age">
											{user?.username === dualPlayerStats?.player2_username
												? user?.age
												: opponentProfile?.age}
										</span>
									</Link>
									<p className="profile-location">
										{user?.username === dualPlayerStats?.player2_username
											? user?.location
											: opponentProfile?.location || "From Earth"}
									</p>
								</div>

								<div className="profile-stats two-player">
									<div className="stat-item two-player">
										<div>
											<h3>{dualPlayerStats?.player2_wins || 0}</h3>
											<p>Wins</p>
										</div>
										<div>
											<h3>{dualPlayerStats?.player2_losses || 0}</h3>
											<p>Losses</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="bottom">
							<div className="stat-item two-player">
								<div>
									<h3>{dualPlayerStats?.games_played || 0}</h3>
									<p>Games Played</p>
								</div>
								<div>
									<h3>{dualPlayerStats?.ties || 0}</h3>
									<p>Ties</p>
								</div>
							</div>
						</div>
					</div>
					{/* <div className="profile-actions">
						<button className="challenge-btn">Challenge Player</button>
					</div> */}
				</>
			) : (
				<div className="stats-container no-display">
					<h1>Sorry...😒 Nothing to display here.</h1>
					<span>Compete with another player to view stats.</span>
				</div>
			)}
		</div>
	);
};

export default DualPlayerStats;
