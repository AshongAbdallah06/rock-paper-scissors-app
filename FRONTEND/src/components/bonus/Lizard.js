import React from "react";
import useContextProvider from "../../hooks/useContextProvider";
import useFunctions from "../../hooks/useFunctions";
import lizardIcon from "../../images/icon-lizard.svg";

const Lizard = ({ bonusState }) => {
	const { moveOnclick, socket, userExists } = useContextProvider();
	const { sendMoveAck } = useFunctions();

	return (
		<div
			className={!bonusState ? "gameOpt" : "gameOpt-bonus"}
			onClick={() => {
				userExists && sendMoveAck(socket);
				userExists
					? moveOnclick("l")
					: alert("You need to login in to be able to use this move.");
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
