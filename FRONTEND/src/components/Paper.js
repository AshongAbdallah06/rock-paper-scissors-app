import React, { useEffect } from "react";
import paperIcon from "../images/icon-paper.svg";
import useCheckContext from "../hooks/useCheckContext";

const Paper = () => {
	const { moveOnclick, socket, listenToMove } = useCheckContext();
	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		listenToMove();
	}, [socket]);

	const sendMoveAck = () => {
		socket.emit("move-made", user.username);
	};

	const bonus = JSON.parse(localStorage.getItem("bonus"));

	return (
		<div
			className={!bonus ? "gameOpt" : "gameOpt-bonus"}
			onClick={() => {
				sendMoveAck();
				moveOnclick("p");
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
