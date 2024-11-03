import React from "react";
import useContextProvider from "../../hooks/useContextProvider";
import useFunctions from "../../hooks/useFunctions";
import spockIcon from "../../images/icon-spock.svg";

const Spock = ({ bonusState }) => {
	const { moveOnclick, socket, userExists } = useContextProvider();
	const { sendMoveAck } = useFunctions();

	return (
		<div
			className={!bonusState ? "gameOpt" : "gameOpt-bonus"}
			onClick={() => {
				userExists && sendMoveAck(socket);
				userExists
					? moveOnclick("sp")
					: alert("You need to login in to be able to use this move.");
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
