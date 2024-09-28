import React, { useEffect, useState } from "react";
import profileIcon from "../images/person-circle-outline.svg";
import singleIcon from "../images/person-outline-black.svg";
import dualIcon from "../images/people-outline-black.svg";
import logo from "../images/logo.svg";
import { Link, useSearchParams } from "react-router-dom";

import useCheckContext from "../hooks/useCheckContext";
import EditProfile from "./EditProfile";
import useFunctions from "../hooks/useFunctions";

const Profile = () => {
	const { currentUserStats, user } = useCheckContext();
	const [renderRoutes, setRenderRoutes] = useState(false);
	const { allGamesPlayed, allLosses, allTies, allWins, getAllDualPlayerStats } = useFunctions();

	useEffect(() => {
		setRenderRoutes(false);
		const timer = setTimeout(() => {
			setRenderRoutes(true);
		}, 100);

		getAllDualPlayerStats(user?.username);
		setImg(user?.image);
		return () => clearTimeout(timer);
	}, []);
	const [img, setImg] = useState(user?.image || null);

	const [edit, setEdit] = useState(false);
	const [newLocation, setNewLocation] = useState(user?.location || "");
	const [newAge, setNewAge] = useState(user?.age || "");
	const [newBio, setNewBio] = useState(user?.bio || "");

	const [searchParams, setSearchParams] = useSearchParams("");

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
								<div className="image-container">
									<img
										src={img || profileIcon}
										alt="Profile"
										className="profile-pic"
									/>
								</div>
								<h1 className="profile-name">
									{user?.username},{" "}
									{newAge && <span className="age">{newAge}</span>}
								</h1>
								<p className="profile-location">{newLocation || "From Earth"}</p>
								<p className="profile-bio">
									{newBio ||
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
								<button
									className="edit-btn"
									onClick={() => {
										setEdit(true);
										setSearchParams((params) => ({
											...params,
											edit: edit ? false : true,
										}));
									}}
								>
									Edit Profile
								</button>
								<button className="challenge-btn">Refetch Stats</button>
							</div>
						</div>
					) : (
						<EditProfile
							edit={edit}
							setEdit={setEdit}
							img={img}
							setImg={setImg}
							user={user}
							newLocation={newLocation}
							newAge={newAge}
							newBio={newBio}
							setNewLocation={setNewLocation}
							setNewAge={setNewAge}
							setNewBio={setNewBio}
						/>
					)}
				</>
			)}
		</>
	);
};

export default Profile;
