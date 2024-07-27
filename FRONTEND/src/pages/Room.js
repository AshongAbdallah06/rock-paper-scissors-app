import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";

const PlayerSelection = () => {
	const { isOnePlayer, roomID, setRoomID, joinRoom, setRoomIsSelected } = useCheckContext();

	useEffect(() => {
		!isOnePlayer && alert("Two players should join the same room to play with each other");
	}, []);
	return (
		<div className="selection">
			<h1>{roomID ? `You are joining ${roomID}` : "Enter a room name"}</h1>

			<div className="room">
				<input
					type="text"
					onChange={(e) => setRoomID(e.target.value)}
					className="room-input"
					maxLength={20}
				/>
			</div>

			<div className="mode-links">
				<Link
					onClick={() => {
						roomID && joinRoom();
						roomID && setRoomIsSelected(true);
					}}
					to={roomID && "/"}
				>
					JOIN ROOM
				</Link>
			</div>
		</div>
	);
};

export default PlayerSelection;
