import React, { useState } from "react";
import Logo from "../components/Logo";
import statsIcon from "../images/stats-chart-outline.svg";
import downIcon from "../images/chevron-down-outline.svg";
import chatIcon from "../images/chatbubbles-outline.svg";
import modeIcon from "../images/game-controller-outline.svg";
import profileIcon from "../images/person-circle-outline.svg";
import { Link } from "react-router-dom";

const HelpSidebar = ({ page, setPage, setFeature, feature }) => {
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
						className={`link sub-link ${
							page === "introduction" && feature === "overview" ? "active" : ""
						}`}
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
						className={`link sub-link ${
							page === "introduction" && feature === "rules" ? "active" : ""
						}`}
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
						className={`link sub-link ${
							page === "introduction" && feature === "how-to-play" ? "active" : ""
						}`}
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
				Features
				{!showFeaturesDropdown ? (
					<img
						src={downIcon}
						alt="down-icon"
						className="copy-icon"
						title="Collapse"
						onClick={() => {
							setShowIntroDropdown(false);

							setShowFeaturesDropdown((prev) => !prev);
						}}
					/>
				) : (
					<img
						src={statsIcon}
						alt="down-icon"
						className="copy-icon"
						title="Fold"
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
						className={`link sub-link ${
							page === "features" && feature === "leaderboard" ? "active" : ""
						}`}
						onClick={() => {
							setPage("features");
							setFeature("leaderboard");
						}}
					>
						<img
							src={statsIcon}
							alt="statsIcon"
						/>
						Leaderboard
					</Link>
					<Link
						className={`link sub-link ${
							page === "features" && feature === "profile" ? "active" : ""
						}`}
						onClick={() => {
							setPage("features");
							setFeature("profile");
						}}
					>
						<img
							src={profileIcon}
							alt="profileIcon"
						/>
						Profile
					</Link>
					<Link
						className={`link sub-link ${
							page === "features" && feature === "modes" ? "active" : ""
						}`}
						onClick={() => {
							setPage("features");
							setFeature("modes");
						}}
					>
						<img
							src={modeIcon}
							alt="modeIcon"
						/>
						Modes
					</Link>
					<Link
						className={`link sub-link ${
							page === "features" && feature === "live-chat" ? "active" : ""
						}`}
						onClick={() => {
							setPage("features");
							setFeature("live-chat");
						}}
					>
						<img
							src={chatIcon}
							alt="chatIcon"
						/>
						Live Chat
					</Link>
				</>
			)}

			<Link
				className={`link ${page === "contact" ? "active" : ""}`}
				onClick={() => {
					setPage("contact");
					setFeature("contact");
				}}
			>
				Contact
			</Link>
		</div>
	);
};

export default HelpSidebar;
