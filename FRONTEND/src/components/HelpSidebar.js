import React, { useState } from "react";
import Logo from "../components/Logo";
import statsIcon from "../images/stats-chart-outline.svg";
import downIcon from "../images/chevron-down-outline.svg";
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
				{!showIntroDropdown ? (
					<img
						src={downIcon}
						alt="copyIcon"
						className="copy-icon"
						title="copy"
						onClick={() => {
							setShowFeaturesDropdown(false);
							setShowIntroDropdown((prev) => !prev);
						}}
					/>
				) : (
					<img
						src={statsIcon}
						alt="copyIcon"
						className="copy-icon"
						title="copy"
						onClick={() => {
							setShowFeaturesDropdown(false);
							setShowIntroDropdown((prev) => !prev);
						}}
					/>
				)}
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
				}}
			>
				<img
					src={statsIcon}
					alt="copyIcon"
					className="copy-icon"
					title="copy"
				/>
				Features
				{!showFeaturesDropdown ? (
					<img
						src={downIcon}
						alt="copyIcon"
						className="copy-icon"
						title="copy"
						onClick={() => {
							setShowIntroDropdown(false);

							setShowFeaturesDropdown((prev) => !prev);
						}}
					/>
				) : (
					<img
						src={statsIcon}
						alt="copyIcon"
						className="copy-icon"
						title="copy"
						onClick={() => {
							setShowIntroDropdown(false);
							setShowFeaturesDropdown((prev) => !prev);
						}}
					/>
				)}
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
