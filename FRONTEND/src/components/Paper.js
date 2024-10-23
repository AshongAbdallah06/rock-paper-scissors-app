import React from "react";
import paperIcon from "../images/icon-paper.svg";
import useContextProvider from "../hooks/useContextProvider";
import useFunctions from "../hooks/useFunctions";

const Paper = ({ bonusState }) => {
	const { moveOnclick, socket } = useContextProvider();
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
