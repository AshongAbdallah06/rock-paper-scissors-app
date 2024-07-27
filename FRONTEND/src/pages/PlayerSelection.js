import React from "react";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";

const PlayerSelection = () => {
	const { setIsOnePlayer, setPlayerIsChosen, setRoomID, setRoomIsSelected } = useCheckContext();
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
					to="/select-room"
				>
					DUAL
				</Link>
				<Link
					onClick={() => {
						setIsOnePlayer(true);
						setPlayerIsChosen(true);
						setRoomIsSelected(true);
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
