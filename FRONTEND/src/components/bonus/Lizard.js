import React, { useEffect } from "react";
import lizardIcon from "../../images/icon-lizard.svg";
import useCheckContext from "../../hooks/useCheckContext";
import useFunctions from "../../hooks/useFunctions";

const Lizard = () => {
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
