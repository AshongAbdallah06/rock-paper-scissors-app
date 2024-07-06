import React, { useContext } from "react";
import scissorsIcon from "../images/icon-scissors.svg";
import { GameContext } from "../App";
import useFunctions from "../hooks/useFunctions";

const Scissors = () => {
	const { setPlayerMove, setComputerMove } = useContext(GameContext);

	const { generateComputerMove } = useFunctions();
	return (
		<div
			className="gameOpt"
			onClick={() => {
				setPlayerMove("s");
				generateComputerMove(setComputerMove);
			}}
		>
			<img
				src={scissorsIcon}
				alt="scissors"
			/>
		</div>
	);
};

export default Scissors;
