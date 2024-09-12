import React, { useEffect } from "react";
import scissorsIcon from "../images/icon-scissors.svg";
import useCheckContext from "../hooks/useCheckContext";
import useFunctions from "../hooks/useFunctions";

const Scissors = ({ bonusState }) => {
	const { moveOnclick, socket, listenToMove } = useCheckContext();
	const { sendMoveAck } = useFunctions();

	useEffect(() => {
		listenToMove();
	}, [socket]);

	return (
		<div
			className={!bonusState ? "gameOpt" : "gameOpt-bonus"}
			onClick={() => {
				sendMoveAck(socket);
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
