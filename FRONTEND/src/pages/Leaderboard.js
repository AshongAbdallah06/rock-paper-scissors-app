import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";
import ScoresDisplay from "../components/Scores";
import useContextProvider from "../hooks/useContextProvider";
import useFunctions from "../hooks/useFunctions";
import back from "../images/arrow-back-outline.svg";
import filterLogo from "../images/filter-outline.svg";
import logo from "../images/logo.svg";

const Leaderboard = () => {
	const { setScores, socket, user, userExists } = useContextProvider();
	const { getAllScores, getStorageItem } = useFunctions();

	const [optChanges, setOptChanges] = useState(getStorageItem("optChanges", "losses"));

	const [renderRoutes, setRenderRoutes] = useState(false);
	useEffect(() => {
		if (userExists) getAllScores(socket, setScores);

		setRenderRoutes(false);
		const timer = setTimeout(() => {
			setRenderRoutes(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		localStorage.setItem("optChanges", JSON.stringify(optChanges));
	}, [optChanges]);

	const [showFilterDropdown, setShowFilterDropdown] = useState(false);

	return (
		<>
			{renderRoutes && (
				<div className="leaderboard">
					<Link
						to="/"
						className="header"
					>
						<img
							src={logo}
							alt="logo"
						/>
					</Link>

					<header>
						<Link
							to="/"
							className="go-back"
						>
							<img
								src={back}
								alt="back"
								className="back"
							/>
							Go back
						</Link>

						<Link
							to={`/p/${user?.username}`}
							className="my-profile"
						>
							View Profile
						</Link>
					</header>
					<div className="leaderboard-container">
						<header>
							<h1>Leaderboard</h1>

							<img
								src={filterLogo}
								alt="filter"
								title="Filter by"
								className="filter-icon"
								onClick={() => setShowFilterDropdown(!showFilterDropdown)}
							/>

							{showFilterDropdown && (
								<FilterDropdown
									optChanges={optChanges}
									setOptChanges={setOptChanges}
									setShowFilterDropdown={setShowFilterDropdown}
								/>
							)}
						</header>

						<div
							className={`header-labels ${
								optChanges === "games_played" && "two-grid"
							}`}
						>
							<p>Username</p>
							<p>
								{(!optChanges || optChanges) === "wins" && "Wins"}
								{optChanges === "losses" && "Losses"}
								{optChanges === "ties" && "Ties"}
								{optChanges === "games_played" && "Games Played"}
							</p>
							{optChanges !== "games_played" ? <p>Percent %</p> : ""}
						</div>

						<ScoresDisplay optChanges={optChanges} />
					</div>
				</div>
			)}
		</>
	);
};

export default Leaderboard;
