import React, { useEffect, useState } from "react";
import profileIcon from "../images/person-circle-outline.svg";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";

const Profile = () => {
	const { selectedUserStats } = useCheckContext();

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
								{selectedUserStats?.username} ({selectedUserStats?.wins})
							</p>
						</div>

						<div className="stats">
							<div className="card">
								<p>Games Played</p>
								<p className="number">{selectedUserStats?.games_played}</p>
							</div>
							<div className="card">
								<p>Wins</p>
								<p className="number">{selectedUserStats?.wins}</p>
							</div>
							<div className="card">
								<p>Ties</p>
								<p className="number">{selectedUserStats?.ties}</p>
							</div>
							<div className="card">
								<p>Loses</p>
								<p className="number">{selectedUserStats?.loses}</p>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Profile;
