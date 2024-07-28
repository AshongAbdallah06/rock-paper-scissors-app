import React from "react";
import useCheckContext from "../hooks/useCheckContext";

const MakingMove = () => {
	const { isOnePlayer } = useCheckContext();

	return (
		<h1 className="making-move">
			{isOnePlayer ? "The House is Making a Move..." : "Processing Moves..."}
		</h1>
	);
};

export default MakingMove;
