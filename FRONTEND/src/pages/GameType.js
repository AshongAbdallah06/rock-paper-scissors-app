import React from "react";
import { Link } from "react-router-dom";

const GameType = () => {
	return (
		<div className="selection">
			<h1 style={{ fontSize: "3rem" }}>Welcome!</h1>

			<p>Please select game type</p>

			<div className="mode-links">
				<Link
					onClick={() => {
						localStorage.setItem("bonus", JSON.stringify(false));
					}}
					to="/"
				>
					NORMAL
				</Link>
				<Link
					onClick={() => {
						localStorage.setItem("bonus", JSON.stringify(true));
					}}
					to="/"
				>
					BONUS
				</Link>
			</div>
		</div>
	);
};

export default GameType;
