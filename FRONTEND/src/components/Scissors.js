import React from "react";
import useCheckContext from "../hooks/useContextProvider";
import useFunctions from "../hooks/useFunctions";
import scissorsIcon from "../images/icon-scissors.svg";

const Scissors = ({ bonusState }) => {
	const { moveOnclick, socket, userExists } = useCheckContext();
	const { sendMoveAck } = useFunctions();

	return (
		<div
			className={!bonusState ? "gameOpt" : "gameOpt-bonus"}
			onClick={() => {
				userExists && sendMoveAck(socket);
				moveOnclick("s");
			}}
		>
			<img
				src={scissorsIcon}
				alt="scissors"
			/>
		</div>
	);
};

export default Scissors;
