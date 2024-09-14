import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DocsContent from "../components/DocsContent";
import Logo from "../components/Logo";
import statsIcon from "../images/stats-chart-outline.svg";

const Help = () => {
	const [page, setPage] = useState("introduction");
	const [showFeaturesDropdown, setShowFeaturesDropdown] = useState("introduction");
	const [showIntroDropdown, setShowIntroDropdown] = useState("overview");
	const [feature, setFeature] = useState("introduction");

	const docsContentRef = useRef(null);
	const featureRef = useRef(null);

	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		setSearchParams((params) => ({ ...params, page }));

		if (docsContentRef.current) {
			docsContentRef.current.scrollIntoView({
				top: 0,
				behavior: "smooth",
			});
		}
		console.log("searchParams", searchParams);
	}, [page]);

	return (
		<div className="help-section">
			<div className="help">
				<div className="sidebar">
					<Logo />

					<Link
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
					</Link>

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
				</div>

				<DocsContent
					docsContentRef={docsContentRef}
					page={page}
					setPage={setPage}
					feature={feature}
					setFeature={setFeature}
					featureRef={featureRef}
					setSearchParams={setSearchParams}
				/>
			</div>
		</div>
	);
};

export default Help;
