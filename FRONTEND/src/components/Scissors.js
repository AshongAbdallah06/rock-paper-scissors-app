import React, { useEffect } from "react";
import scissorsIcon from "../images/icon-scissors.svg";
import useCheckContext from "../hooks/useCheckContext";
import useFunctions from "../hooks/useFunctions";

const Scissors = () => {
	const { moveOnclick, socket, listenToMove } = useCheckContext();
	const { sendMoveAck } = useFunctions();

	useEffect(() => {
		listenToMove();
	}, [socket]);

	const bonus = JSON.parse(localStorage.getItem("bonus"));

	return (
		<div
			className={!bonus ? "gameOpt" : "gameOpt-bonus"}
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
