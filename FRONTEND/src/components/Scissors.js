import React from "react";
import scissorsIcon from "../images/icon-scissors.svg";
import useFunctions from "../hooks/useFunctions";
import useCheckContext from "../hooks/useCheckContext";

const Scissors = () => {
	const { moveOnclick } = useCheckContext();

	return (
		<div
			className="gameOpt"
			onClick={() => {
				moveOnclick("s");
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
