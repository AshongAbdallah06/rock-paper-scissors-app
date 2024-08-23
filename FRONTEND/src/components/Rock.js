import React, { useEffect } from "react";
import rockIcon from "../images/icon-rock.svg";
import useCheckContext from "../hooks/useCheckContext";
import useFunctions from "../hooks/useFunctions";

const Rock = () => {
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
