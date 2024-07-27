import React from "react";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";

const PlayerSelection = () => {
	const { setIsOnePlayer, setPlayerIsChosen } = useCheckContext();
	return (
		<div className="selection">
			<h1>Welcome!</h1>

			<p>Please select game mode</p>

			<div className="mode-links">
				<Link
					onClick={() => {
						setIsOnePlayer(false);
						setPlayerIsChosen(true);
					}}
					to="/"
				>
					DUAL
				</Link>
				<Link
					onClick={() => {
						setIsOnePlayer(true);
						setPlayerIsChosen(true);
					}}
					to="/"
				>
					SINGLE
				</Link>
			</div>
		</div>
	);
};

export default PlayerSelection;
