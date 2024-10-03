import React, { useEffect, useState } from "react";
import profileIcon from "../images/person-circle-outline.svg";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";
import singleIcon from "../images/person-outline-black.svg";
import dualIcon from "../images/people-outline-black.svg";
import useFunctions from "../hooks/useFunctions";
import Axios from "axios";

const Profile = () => {
	const { selectedUserStats, user } = useCheckContext();
	const { allGamesPlayed, allLosses, allTies, allWins, getAllDualPlayerStats } = useFunctions();
	const [renderRoutes, setRenderRoutes] = useState(false);

	useEffect(() => {
		localStorage.setItem("selectedUser", JSON.stringify(selectedUserStats));
	}, [selectedUserStats]);

	const [opponentProfile, setOpponentProfile] = useState(null);
	const getUserProfiles = async (username) => {
		try {
			const res = await Axios.post(
				"https://rock-paper-scissors-app-iybf.onrender.com/api/user/profiles",
				{ username }
			);
			const updatedUser = res.data;
			const opponentData = res.data;

			if (opponentData) {
				setOpponentProfile(opponentData[0]);
				console.log("opponentProfile: ", opponentProfile);
			}
		} catch (error) {
			if (error?.response?.status === 413) {
				alert("File too large");
			}
			console.log(error);
		}
	};

	useEffect(() => {
		setRenderRoutes(false);
		const timer = setTimeout(() => {
			setRenderRoutes(true);
		}, 100);

		getUserProfiles(selectedUserStats?.username);
		getAllDualPlayerStats(selectedUserStats?.username);
		return () => clearTimeout(timer);
	}, []);
	const [img, setImg] = useState(JSON.parse(localStorage.getItem("image")) || "");

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
						<p onClick={getAllDualPlayerStats}>Refetch</p>
						<div className="profile-header">
							<img
								src={opponentProfile?.image || profileIcon}
								alt="Profile"
								className="profile-pic"
							/>
							<h1 className="profile-name">
								{selectedUserStats?.username},{" "}
								<span className="age">{opponentProfile?.age}</span>
							</h1>
							<p className="profile-location">
								{opponentProfile?.location || "From Earth"}
							</p>
							<p className="profile-bio">
								{opponentProfile?.bio ||
									"I’m a mysterious individual who has yet to fill out my bio. One thing’s for certain: I love to play rock-paper-scissors!"}
							</p>
						</div>

						<div className="profile-stats">
							<div className="stat-item">
								<img
									src={singleIcon}
									alt=""
								/>
								<p>Single</p>
							</div>
							<div className="stat-item">
								<h3>{selectedUserStats?.games_played || 0}</h3>
								<p>Games Played</p>
							</div>
							<div className="stat-item">
								<h3>{selectedUserStats?.wins || 0}</h3>
								<p>Wins</p>
							</div>
							<div className="stat-item">
								<h3>{selectedUserStats?.losses || 0}</h3>
								<p>Losses</p>
							</div>
							<div className="stat-item">
								<h3>{selectedUserStats?.ties || 0}</h3>
								<p>Ties</p>
							</div>
						</div>

						<div className="profile-stats">
							<div className="stat-item">
								<img
									src={dualIcon}
									alt=""
								/>
								<p>Dual</p>
							</div>
							<div className="stat-item">
								<h3>{allGamesPlayed ? allGamesPlayed : 0}</h3>
								<p>Games Played</p>
							</div>
							<div className="stat-item">
								<h3>{allWins ? allWins : 0}</h3>
								<p>Wins</p>
							</div>
							<div className="stat-item">
								<h3>{allLosses ? allLosses : 0}</h3>
								<p>Losses</p>
							</div>
							<div className="stat-item">
								<h3>{allTies ? allTies : 0}</h3>
								<p>Ties</p>
							</div>
						</div>

						<div className="profile-actions">
							<button className="challenge-btn">Challenge Player</button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Profile;
