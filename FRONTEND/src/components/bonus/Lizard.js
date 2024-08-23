import React, { useEffect } from "react";
import lizardIcon from "../../images/icon-lizard.svg";
import useCheckContext from "../../hooks/useCheckContext";

const Lizard = () => {
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
				moveOnclick("l");
			}}
		>
			<img
				src={lizardIcon}
				alt="lizard"
			/>
		</div>
	);
};

export default Lizard;
