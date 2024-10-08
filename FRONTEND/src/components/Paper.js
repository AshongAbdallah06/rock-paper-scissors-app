import React, { useEffect } from "react";
import paperIcon from "../images/icon-paper.svg";
import useCheckContext from "../hooks/useCheckContext";
import useFunctions from "../hooks/useFunctions";

const Paper = ({ bonusState }) => {
	const { moveOnclick, socket } = useCheckContext();
	const { sendMoveAck } = useFunctions();

	return (
		<div
			className={!bonusState ? "gameOpt" : "gameOpt-bonus"}
			onClick={() => {
				sendMoveAck(socket);
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
