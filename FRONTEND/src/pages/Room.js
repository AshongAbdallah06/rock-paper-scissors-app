import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";

const PlayerSelection = () => {
	const { roomID, setRoomID, joinRoom, setRoomIsSelected, isOnePlayer, setIsOnePlayer } =
		useCheckContext();

	useEffect(() => {
		localStorage.setItem("player-mode", JSON.stringify(isOnePlayer ? "single" : "dual"));
	}, [isOnePlayer]);

	const copyRoomID = async () => {
		try {
			await navigator.clipboard.writeText(roomID);
			await navigator.clipboard.readText();
		} catch (error) {
			console.log("🚀 ~ copyRoomID ~ error:", error);
		}
	};
	return (
		<form
			className="selection"
			onSubmit={(e) => {
				e.preventDefault();
				roomID && joinRoom();
				roomID && setRoomIsSelected(true);
			}}
		>
			<h1>{roomID ? `ROOM ID: ${roomID}` : "Enter room ID"}</h1>

			<div className="room">
				<input
					type="text"
					onChange={(e) => setRoomID(e.target.value)}
					className="room-input"
					maxLength={20}
				/>
			</div>

			<div>
				<Link
					className="join-room"
					onClick={() => {
						if (roomID) {
							joinRoom();
							setRoomIsSelected(true);
							copyRoomID();
							setIsOnePlayer(false);
						}
					}}
					to={roomID && "/"}
				>
					JOIN ROOM
				</Link>

				<span className="or">OR</span>

				<p
					className="change-mode"
					style={{ marginTop: "1rem" }}
					onClick={() => {
						localStorage.removeItem("player-mode");
						window.location.href = "/";
					}}
				>
					Change Mode
				</p>
			</div>
		</form>
	);
};

export default PlayerSelection;
