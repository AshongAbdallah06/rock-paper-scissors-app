import React, { useEffect } from "react";
import rockIcon from "../images/icon-rock.svg";
import useCheckContext from "../hooks/useCheckContext";

const Rock = () => {
	const { moveOnclick, socket, listenToMove } = useCheckContext();
	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		listenToMove();
	}, [socket]);

	const sendMoveAck = () => {
		socket.emit("move-made", user.username);
	};

	return (
		<div
			className="gameOpt"
			onClick={() => {
				sendMoveAck();
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
