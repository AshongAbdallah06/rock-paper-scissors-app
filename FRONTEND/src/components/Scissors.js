import React from "react";
import scissorsIcon from "../images/icon-scissors.svg";
import useFunctions from "../hooks/useFunctions";
import useCheckContext from "../hooks/useCheckContext";

const Scissors = () => {
	const { setPlayerMove, setComputerMove, makeMove, isOnePlayer } = useCheckContext();

	const { generateComputerMove } = useFunctions();

	return (
		<div
			className="gameOpt"
			onClick={() => {
				!isOnePlayer && makeMove("s");
				isOnePlayer && setPlayerMove("s");
				isOnePlayer && generateComputerMove(setComputerMove);
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
