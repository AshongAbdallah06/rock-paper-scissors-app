import React, { useEffect } from "react";
import spockIcon from "../../images/icon-spock.svg";
import useCheckContext from "../../hooks/useCheckContext";
import useFunctions from "../../hooks/useFunctions";

const Spock = ({ bonusState }) => {
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
