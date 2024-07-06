import React, { useContext } from "react";
import paperIcon from "../images/icon-paper.svg";
import { GameContext } from "../App";
import useFunctions from "../hooks/useFunctions";

const Paper = () => {
	const { setPlayerMove, setComputerMove } = useContext(GameContext);

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
