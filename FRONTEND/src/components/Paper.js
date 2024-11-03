import React from "react";
import useContextProvider from "../hooks/useContextProvider";
import useFunctions from "../hooks/useFunctions";
import paperIcon from "../images/icon-paper.svg";

const Paper = ({ bonusState }) => {
	const { moveOnclick, socket, userExists } = useContextProvider();
	const { sendMoveAck } = useFunctions();

	return (
		<div
			className={!bonusState ? "gameOpt" : "gameOpt-bonus"}
			onClick={() => {
				userExists && sendMoveAck(socket);
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
