import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useContextProvider from "../hooks/useContextProvider";

const ScoresDisplay = ({ optChanges }) => {
	const { scores, getUserStats, setScores, socket, user, userExists } = useContextProvider();

	const [searchParams, setSearchParams] = useSearchParams();

	const optChangesFunc = (socketName, query) => {
		socket.emit(socketName);
		setSearchParams((params) => ({ ...params, filter_query: query }));
		setScoresIsFetched(false);
	};

	const [scoresIsFetched, setScoresIsFetched] = useState(false);
	useEffect(() => {
		if (userExists)
			if (optChanges === "wins") {
				optChangesFunc("getScores", "wins");
			} else if (optChanges === "losses") {
				optChangesFunc("getScoresByLosses", "losses");
			} else if (optChanges === "ties") {
				optChangesFunc("getScoresByTies", "ties");
			} else if (optChanges === "games_played") {
				optChangesFunc("getScoresByGamesPlayed", "games_played");
			}

		setTimeout(() => {
			setScoresIsFetched(true);
		}, 2000);
	}, [optChanges]);

	useEffect(() => {
		socket.on("getAllScores", (scores) => {
			setScores(scores);
		});
		socket.on("getScoresByLosses", (scoresByLosses) => {
			setScores(scoresByLosses);
		});
		socket.on("getScoresByTies", (scoresByTies) => {
			setScores(scoresByTies);
		});
		socket.on("getScoresByGamesPlayed", (scoresByGamesPlayed) => {
			setScores(scoresByGamesPlayed);
		});
	}, [socket]);

	return (
		<ul className="scores-display">
			{!scoresIsFetched && (
				<div className="lds-spinner">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}

			{scoresIsFetched &&
				scores?.map((score) => (
					<Link
						to={`/p/${score?.username}`}
						title={score?.username}
						style={{
							textDecoration: "none",
							backgroundColor:
								user?.username === score?.username && "hsl(349, 70%, 56%)",
							color: user?.username === score?.username && "black",
						}}
						className={`user ${optChanges === "games_played" && "two-grid"}`}
						key={score?.username}
						onClick={() => {
							userExists && getUserStats(score?.username);
						}}
					>
						<p
							style={{
								fontWeight: user?.username === score?.username ? "bold" : "normal",
							}}
						>
							{score?.username === user?.username ? "You" : score?.username}
						</p>
						<span style={{ color: "orange" }}>
							{optChanges === "wins" && score?.wins}
							{optChanges === "losses" && score?.losses}
							{optChanges === "ties" && score?.ties}
							{optChanges === "games_played" && score?.games_played}
						</span>

						{/* WinsPercentage */}
						{(!optChanges || optChanges) === "wins" && (
							<span style={{ color: "orange" }}>
								{score?.wins !== 0 && score?.games_played !== 0
									? ((score?.wins / score?.games_played) * 100).toFixed(2)
									: 0}
								%
							</span>
						)}

						{/* LossesPercentage */}
						{optChanges === "losses" && (
							<span style={{ color: "orange" }}>
								{score?.losses !== 0 && score?.games_played !== 0
									? ((score?.losses / score?.games_played) * 100).toFixed(2)
									: 0}
								%
							</span>
						)}

						{/* TiesPercentage */}
						{optChanges === "ties" && (
							<span style={{ color: "orange" }}>
								{score?.ties !== 0 && score?.games_played !== 0
									? ((score?.ties / score?.games_played) * 100).toFixed(2)
									: 0}
								%
							</span>
						)}
					</Link>
				))}
		</ul>
	);
};

export default ScoresDisplay;
