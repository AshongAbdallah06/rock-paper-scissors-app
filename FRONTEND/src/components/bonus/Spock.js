import React, { useEffect } from "react";
import spockIcon from "../../images/icon-spock.svg";
import useCheckContext from "../../hooks/useCheckContext";

const Spock = () => {
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
				moveOnclick("sp");
			}}
		>
			<img
				src={spockIcon}
				alt="spock"
			/>
		</div>
	);
};

export default Spock;
