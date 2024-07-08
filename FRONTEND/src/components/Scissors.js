import React, { useEffect } from "react";
import scissorsIcon from "../images/icon-scissors.svg";
import useFunctions from "../hooks/useFunctions";
import useCheckContext from "../hooks/useCheckContext";

const Scissors = () => {
	const { playerMove, setPlayerMove, setComputerMove } = useCheckContext();

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
