import React, { useEffect } from "react";
import scissorsIcon from "../images/icon-scissors.svg";
import useCheckContext from "../hooks/useCheckContext";

const Scissors = () => {
	const { moveOnclick, socket, listenToMove } = useCheckContext();
	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		listenToMove();
	}, [socket]);

	const sendMoveAck = () => {
		socket.emit("move-made", user.username);
	};

	return (
		<div
			className="gameOpt"
			onClick={() => {
				sendMoveAck();
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
