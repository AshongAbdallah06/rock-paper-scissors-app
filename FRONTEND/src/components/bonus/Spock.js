import React, { useEffect } from "react";
import spockIcon from "../../images/icon-spock.svg";
import useCheckContext from "../../hooks/useCheckContext";
import useFunctions from "../../hooks/useFunctions";

const Spock = () => {
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
