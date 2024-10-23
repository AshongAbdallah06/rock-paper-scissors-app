import React, { FC, useEffect } from "react";
import lizardIcon from "../../images/icon-lizard.svg";
import useContextProvider from "../../hooks/useContextProvider";
import useFunctions from "../../hooks/useFunctions";

const Lizard = ({ bonusState }) => {
	const { moveOnclick, socket } = useContextProvider();
	const { sendMoveAck } = useFunctions();

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
