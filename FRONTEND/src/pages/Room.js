import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";

const PlayerSelection = () => {
	const { roomID, setRoomID, joinRoom, setRoomIsSelected, isOnePlayer, setIsOnePlayer } =
		useCheckContext();

	useEffect(() => {
		localStorage.setItem("userGameState", JSON.stringify(isOnePlayer));
	}, [isOnePlayer]);

	return (
		<form
			className="selection"
			onSubmit={(e) => {
				e.preventDefault();
				roomID && joinRoom();
				roomID && setRoomIsSelected(true);
			}}
		>
			<h1>{roomID ? `ROOM NAME: ${roomID}` : "Enter a room name"}</h1>

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

						setIsOnePlayer(false);
					}}
					to={roomID && "/"}
				>
					JOIN ROOM
				</Link>
			</div>
		</form>
	);
};

export default PlayerSelection;
