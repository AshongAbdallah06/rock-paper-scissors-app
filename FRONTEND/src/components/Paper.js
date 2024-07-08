import React from "react";
import paperIcon from "../images/icon-paper.svg";
import {} from "../App";
import useFunctions from "../hooks/useFunctions";
import useCheckContext from "../hooks/useCheckContext";

const Paper = () => {
	const { setPlayerMove, setComputerMove } = useCheckContext();

	const { generateComputerMove } = useFunctions();
	return (
		<div
			className="gameOpt"
			onClick={() => {
				setPlayerMove("p");
				generateComputerMove(setComputerMove);
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
