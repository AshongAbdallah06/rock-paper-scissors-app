import React, { useEffect, useState } from "react";
import profileIcon from "../images/person-circle-outline.svg";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";

const Profile = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const { currentUserStats } = useCheckContext();

	const [isRendered, setIsRendered] = useState(false);
	useEffect(() => {
		setIsRendered(false);

		setTimeout(() => {
			setIsRendered(true);
		}, 2000);
	}, []);

	return (
		<>
			{!isRendered && <Loader />}
			{isRendered && (
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
								{user.username} ({currentUserStats?.wins})
							</p>
						</div>

						<div className="stats">
							<div className="card">
								<p>Games Played</p>
								<p className="number">{currentUserStats?.gamesPlayed}</p>
							</div>
							<div className="card">
								<p>Wins</p>
								<p className="number">{currentUserStats?.wins}</p>
							</div>
							<div className="card">
								<p>Ties</p>
								<p className="number">{currentUserStats?.ties}</p>
							</div>
							<div className="card">
								<p>Loses</p>
								<p className="number">{currentUserStats?.loses}</p>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Profile;
