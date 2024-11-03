import React from "react";
import useCheckContext from "../hooks/useContextProvider";
import useFunctions from "../hooks/useFunctions";
import rockIcon from "../images/icon-rock.svg";

const Rock = ({ bonusState }) => {
	const { moveOnclick, socket, userExists } = useCheckContext();
	const { sendMoveAck } = useFunctions();

	return (
		<div
			className={!bonusState ? "gameOpt" : "gameOpt-bonus"}
			onClick={() => {
				userExists && sendMoveAck(socket);
				moveOnclick("r");
			}}
		>
			<img
				src={rockIcon}
				alt="rock"
			/>
		</div>
	);
};

export default Rock;
