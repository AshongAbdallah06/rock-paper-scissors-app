import React, { useState } from "react";
import Logo from "../components/Logo";
import statsIcon from "../images/stats-chart-outline.svg";
import { Link } from "react-router-dom";

const HelpSidebar = ({ setPage, setFeature }) => {
	const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(null);
	const [showIntroDropdown, setShowIntroDropdown] = useState(null);

	return (
		<div className="sidebar">
			<Logo />

			<div
				className="link"
				onClick={() => {
					setPage("introduction");
					setShowIntroDropdown((prev) => !prev);
					setFeature("overview");
				}}
			>
				<img
					src={statsIcon}
					alt="copyIcon"
					className="copy-icon"
					title="copy"
				/>
				Introduction
			</div>

			{showIntroDropdown && (
				<>
					<Link
						className="link sub-link"
						onClick={() => {
							setPage("introduction");
							setFeature("overview");
						}}
					>
						<img
							src={statsIcon}
							alt="copyIcon"
							className="copy-icon"
							title="copy"
						/>
						Overview
					</Link>
					<Link
						className="link sub-link"
						onClick={() => {
							setPage("introduction");
							setFeature("rules");
						}}
					>
						<img
							src={statsIcon}
							alt="copyIcon"
							className="copy-icon"
							title="copy"
						/>
						Rules
					</Link>
					<Link
						className="link sub-link"
						onClick={() => {
							setPage("introduction");
							setFeature("how-to-play");
						}}
					>
						<img
							src={statsIcon}
							alt="copyIcon"
							className="copy-icon"
							title="copy"
						/>
						How To Play
					</Link>
				</>
			)}

			<Link
				className="link"
				onClick={() => {
					setPage("features");
					setFeature("leaderboard");
					setShowFeaturesDropdown((prev) => !prev);
				}}
			>
				<img
					src={statsIcon}
					alt="copyIcon"
					className="copy-icon"
					title="copy"
				/>
				Features
			</Link>

			{showFeaturesDropdown && (
				<>
					<Link
						className="link sub-link"
						onClick={() => {
							setPage("features");
							setFeature("leaderboard");
						}}
					>
						Leaderboard
					</Link>
					<Link
						className="link sub-link"
						onClick={() => {
							setPage("features");
							setFeature("profile");
						}}
					>
						Profile
					</Link>
					<Link
						className="link sub-link"
						onClick={() => {
							setPage("features");
							setFeature("modes");
						}}
					>
						Modes
					</Link>
				</>
			)}

			<Link
				// to="/help/contact"
				className="link"
				onClick={() => {
					setPage("contact");
					// setShowIntroDropdown((prev) => !prev);
					// setFeature("overview");
				}}
			>
				<img
					src={statsIcon}
					alt="copyIcon"
					className="copy-icon"
					title="copy"
				/>
				Contact
			</Link>
		</div>
	);
};

export default HelpSidebar;
