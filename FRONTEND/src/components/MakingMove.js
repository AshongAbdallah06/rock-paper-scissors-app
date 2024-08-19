import React from "react";
import useCheckContext from "../hooks/useCheckContext";
import LoadingDots from "./LoadingDots";

const MakingMove = () => {
	const { isOnePlayer } = useCheckContext();

	return (
		<h1 className="making-move">
			{isOnePlayer ? (
				<>
					The House is Making a Move
					<LoadingDots />
				</>
			) : (
				<>
					Processing Moves
					<LoadingDots />
				</>
			)}
		</h1>
	);
};

export default MakingMove;
