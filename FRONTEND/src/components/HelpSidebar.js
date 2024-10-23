import React, { FC, useState } from "react";
import Logo from "../components/Logo";
import statsIcon from "../images/stats-chart-outline.svg";
import upIcon from "../images/chevron-up-outline.svg";
import downIcon from "../images/chevron-down-outline.svg";
import chatIcon from "../images/chatbubbles-outline.svg";
import modeIcon from "../images/game-controller-outline.svg";
import rulesIcon from "../images/book-outline.svg";
import profileIcon from "../images/person-circle-outline.svg";
import overviewIcon from "../images/document-text-outline.svg";
import playIcon from "../images/play-outline.svg";
import { Link } from "react-router-dom";

const HelpSidebar = ({ page, setPage, setFeature, feature }) => {
	const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);
	const [showIntroDropdown, setShowIntroDropdown] = useState(false);

	return (
		<div className="sidebar">
			<Logo />

			<div
				className="help-link"
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
						className="down-icon"
						title="copy"
						onClick={() => {
							setShowFeaturesDropdown(false);
							setShowIntroDropdown((prev) => !prev);
						}}
					/>
				) : (
					<img
						src={upIcon}
						alt="copyIcon"
						className="down-icon"
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
						to=""
						className={`link sub-link ${
							page === "introduction" && feature === "overview" ? "active" : ""
						}`}
						onClick={() => {
							setPage("introduction");
							setFeature("overview");
						}}
					>
						<img
							src={overviewIcon}
							alt="copyIcon"
							className="down-icon"
							title="copy"
						/>
						Overview
					</Link>
					<Link
						to=""
						className={`link sub-link ${
							page === "introduction" && feature === "rules" ? "active" : ""
						}`}
						onClick={() => {
							setPage("introduction");
							setFeature("rules");
						}}
					>
						<img
							src={rulesIcon}
							alt="copyIcon"
							className="down-icon"
							title="copy"
						/>
						Rules
					</Link>
					<Link
						to=""
						className={`link sub-link ${
							page === "introduction" && feature === "how-to-play" ? "active" : ""
						}`}
						onClick={() => {
							setPage("introduction");
							setFeature("how-to-play");
						}}
					>
						<img
							src={playIcon}
							alt="copyIcon"
							className="down-icon"
							title="copy"
						/>
						How To Play
					</Link>
				</>
			)}

			<Link
				to=""
				className="help-link"
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
						className="down-icon"
						title="Collapse"
						onClick={() => {
							setShowIntroDropdown(false);

							setShowFeaturesDropdown((prev) => !prev);
						}}
					/>
				) : (
					<img
						src={upIcon}
						alt="down-icon"
						className="down-icon"
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
						to=""
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
						to=""
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
						to=""
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
						to=""
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
				to=""
				className={`help-link ${page === "contact" ? "active" : ""}`}
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
