import React from "react";
import paperIcon from "../images/icon-paper.svg";
import useFunctions from "../hooks/useFunctions";
import useCheckContext from "../hooks/useCheckContext";

const Paper = () => {
	const { setPlayerMove, setComputerMove, makeMove, isOnePlayer } = useCheckContext();

	const { generateComputerMove } = useFunctions();

	return (
		<div
			className="gameOpt"
			onClick={() => {
				!isOnePlayer && makeMove("p");
				isOnePlayer && setPlayerMove("p");
				isOnePlayer && generateComputerMove(setComputerMove);
			}}
		>
			<img
				src={paperIcon}
				alt="paper"
			/>
		</div>
	);
};

export default Paper;
