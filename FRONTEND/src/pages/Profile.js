import React, { useEffect, useState } from "react";
import profileIcon from "../images/person-circle-outline.svg";
import singleIcon from "../images/person-outline-black.svg";
import dualIcon from "../images/people-outline-black.svg";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

import useCheckContext from "../hooks/useCheckContext";
import EditProfile from "./EditProfile";
import Axios from "axios";

const Profile = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const { currentUserStats } = useCheckContext();
	const [renderRoutes, setRenderRoutes] = useState(false);

	// For all stats of the current user in dual player mode
	const [allDualPlayerStats, setAllDualPlayerStats] = useState(false);
	const [allGamesPlayed, setAllGamesPlayed] = useState(false);
	const [allWins, setAllWins] = useState(false);
	const [allLosses, setAllLosses] = useState(false);
	const [allTies, setAllTies] = useState(false);

	useEffect(() => {
		setRenderRoutes(false);
		const timer = setTimeout(() => {
			setRenderRoutes(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);
	const [img, setImg] = useState(JSON.parse(localStorage.getItem("image")) || "");
	const [img1, setImg1] = useState("");
	const handleFileChange = (e) => {
		const file = e.target.files[0]; // Get the selected file
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file); // Read file as data URL
			reader.onloadend = () => {
				setImg(reader.result); // Set image URL
			};
		}
	};

	useEffect(() => {
		localStorage.setItem("image", JSON.stringify(img));
	}, [img]);
	const [edit, setEdit] = useState(false);

	let totalGamesPlayed = 0;
	let totalWins = 0;
	let totalLosses = 0;
	let totalTies = 0;

	const getAllDualPlayerStats = async () => {
		try {
			const response = await Axios.get(
				`http://localhost:4001/api/user/stats/dual-player/${user?.username}`
			);

			const data = response.data;

			data.forEach((stat) => {
				if (stat.player1_username === user?.username) {
					totalWins += stat.player1_wins;
					totalLosses += stat.player1_losses;
				} else if (stat.player2_username === user?.username) {
					totalWins += stat.player2_wins;
					totalLosses += stat.player2_losses;
				}
				totalGamesPlayed += stat.games_played;
				totalTies += stat.ties;

				setAllGamesPlayed(totalGamesPlayed || 0);
				setAllWins(totalWins || 0);
				setAllLosses(totalLosses || 0);
				setAllTies(totalTies || 0);
			});

			setAllDualPlayerStats(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAllDualPlayerStats();
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
					{!edit ? (
						<div className="profile-container">
							<div className="profile-header">
								<img
									src={img || profileIcon}
									alt="Profile"
									className="profile-pic"
								/>
								<h1 className="profile-name">
									{user?.username}, <span className="age">39</span>
								</h1>
								<p className="profile-location">{user?.location || "From Earth"}</p>
								<p className="profile-bio">
									{user?.bio ||
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
									<h3>{currentUserStats?.gamesPlayed || 0}</h3>
									<p>Games Played</p>
								</div>
								<div className="stat-item">
									<h3>{currentUserStats?.wins || 0}</h3>
									<p>Wins</p>
								</div>
								<div className="stat-item">
									<h3>{currentUserStats?.loses || 0}</h3>
									<p>Losses</p>
								</div>
								<div className="stat-item">
									<h3>{currentUserStats?.ties || 0}</h3>
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
									<h3>{allGamesPlayed}</h3>
									<p>Games Played</p>
								</div>
								<div className="stat-item">
									<h3>{allWins}</h3>
									<p>Wins</p>
								</div>
								<div className="stat-item">
									<h3>{allLosses}</h3>
									<p>Losses</p>
								</div>
								<div className="stat-item">
									<h3>{allTies}</h3>
									<p>Ties</p>
								</div>
							</div>

							<div className="profile-actions">
								<button
									className="edit-btn"
									onClick={() => setEdit(true)}
								>
									Edit Profile
								</button>
								<button className="challenge-btn">Challenge Player</button>
							</div>
						</div>
					) : (
						<EditProfile setEdit={setEdit} />
					)}
				</>
			)}
		</>
	);
};

export default Profile;
