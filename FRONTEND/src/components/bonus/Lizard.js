import React, { useEffect } from "react";
import lizardIcon from "../../images/icon-lizard.svg";
import useCheckContext from "../../hooks/useCheckContext";
import useFunctions from "../../hooks/useFunctions";

const Lizard = ({ bonusState }) => {
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
