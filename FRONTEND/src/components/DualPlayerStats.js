import React, { useEffect, useState } from "react";
import profileIcon from "../images/person-circle-outline.svg";
import logo from "../images/logo.svg";
import useCheckContext from "../hooks/useCheckContext";
import closeIcon from "../images/icon-close nav.svg";

const DualPlayerStats = ({ setShowDualPlayerStats }) => {
	const { getPlayerStats, dualPlayerStats, p1Username, p2Username } = useCheckContext();

	const user = JSON.parse(localStorage.getItem("user"));
	const [twoUsersDetected, setTwoUsersDetected] = useState(null);
	useEffect(() => {
		if (p1Username && p2Username) {
			getPlayerStats(p1Username, p2Username);
			setTwoUsersDetected(true);
		} else {
			setTwoUsersDetected(false);
		}
	}, []);

	const [img, setImg] = useState("");
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
	const handleFileChange1 = (e) => {
		const file1 = e.target.files[0]; // Get the selected file

		if (file1) {
			const reader = new FileReader();
			reader.readAsDataURL(file1); // Read file as data URL
			reader.onloadend = () => {
				setImg1(reader.result); // Set image URL
			};
		}
	};

	return (
		<div className="overlay">
			<img
				src={closeIcon}
				alt="close"
				className="close-icon"
				onClick={() => setShowDualPlayerStats(false)}
			/>

			{twoUsersDetected ? (
				<>
					<div className="profile-container two-player">
						<div className="top">
							<div>
								<div className="profile-header">
									<img
										src={img || profileIcon}
										alt="Profile"
										className="profile-pic"
									/>
									<h1 className="profile-name">
										{(dualPlayerStats?.player1_username === user?.username &&
											"You") ||
											dualPlayerStats?.player1_username}
										, <span className="age">39</span>
									</h1>
									<p className="profile-location">
										{user?.location || "From Earth"}
									</p>
								</div>

								<div className="profile-stats two-player">
									<div>
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
							</div>

							<div className="divider"></div>

							<div>
								<div className="profile-header">
									<img
										src={img || profileIcon}
										alt="Profile"
										className="profile-pic"
									/>
									<h1 className="profile-name">
										{(dualPlayerStats?.player2_username === user?.username &&
											"You") ||
											dualPlayerStats?.player2_username}
										, <span className="age">39</span>
									</h1>
									<p className="profile-location">
										{user?.location || "From Earth"}
									</p>
								</div>

								<div className="profile-stats two-player">
									<div>
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
					<span>Match with another player to view stats.</span>
				</div>
			)}
		</div>
	);
};

export default DualPlayerStats;
