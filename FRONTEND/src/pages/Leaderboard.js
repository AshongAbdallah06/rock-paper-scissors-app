import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import filterLogo from "../images/filter-outline.svg";
import back from "../images/arrow-back-outline.svg";
import useCheckContext from "../hooks/useCheckContext";
import useFunctions from "../hooks/useFunctions";
import Scores from "../components/Scores";
import FilterDropdown from "../components/FilterDropdown";

const Leaderboard = () => {
	const { setScores, socket } = useCheckContext();
	const { getAllScores } = useFunctions();

	const user = JSON.parse(localStorage.getItem("user"));
	const [optChanges, setOptChanges] = useState(null);

	const [renderRoutes, setRenderRoutes] = useState(false);
	useEffect(() => {
		getAllScores(socket, setScores);
		setOptChanges("wins");

		setRenderRoutes(false);
		const timer = setTimeout(() => {
			setRenderRoutes(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

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
								title="filter"
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

						<div className="header-labels">
							<p>Username</p>
							<p>
								{(!optChanges || optChanges) === "wins" && "Wins"}
								{optChanges === "losses" && "Losses"}
								{optChanges === "ties" && "Ties"}
								{optChanges === "games_played" && "Games Played"}
							</p>
							<p>Percent %</p>
						</div>

						<Scores optChanges={optChanges} />
					</div>
				</div>
			)}
		</>
	);
};

export default Leaderboard;
