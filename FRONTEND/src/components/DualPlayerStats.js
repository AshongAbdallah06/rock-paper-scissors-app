import React, { useEffect, useState } from "react";
import profileIcon from "../images/person-circle-outline.svg";
import logo from "../images/logo.svg";
import useCheckContext from "../hooks/useCheckContext";
import closeIcon from "../images/icon-close nav.svg";

const DualPlayerStats = ({ setShowDualPlayerStats }) => {
	const { getPlayerStats, dualPlayerStats } = useCheckContext();

	const usernames = JSON.parse(localStorage.getItem("usernames"));
	const user = JSON.parse(localStorage.getItem("user"));
	const [twoUsersDetected, setTwoUsersDetected] = useState(null);
	useEffect(() => {
		if (usernames?.p1Username && usernames?.p2Username) {
			getPlayerStats(usernames?.p1Username, usernames?.p2Username);
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

	useEffect(() => {
		console.log(img);
	}, [img]);

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
					<div className="stats-container">
						<div className="player">
							<div className="profile">
								<img
									src={img1 || profileIcon}
									className="profile-icon"
									alt="profile-icon"
								/>
								<p className="username">
									{(dualPlayerStats?.player1_username === user?.username &&
										"You") ||
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

							<div>
								<input
									type="file"
									onChange={handleFileChange1}
								/>
							</div>
						</div>

						<div className="player">
							<div className="profile">
								<img
									src={img || profileIcon}
									className="profile-icon"
									alt="profile-icon"
								/>
								<p className="username">
									{(dualPlayerStats?.player2_username === user?.username &&
										"You") ||
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

							<div>
								<input
									type="file"
									onChange={handleFileChange}
								/>
								{/* {img && (
									<img
										src={img}
										style={{ width: "10rem", height: "10rem" }}
										alt="Uploaded"
									/>
								)} */}
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
				</>
			) : (
				<h1 className="stats-container no-display">Sorry...😒 Nothing to display here</h1>
			)}
		</div>
	);
};

export default DualPlayerStats;
