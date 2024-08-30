import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";
import useFunctions from "../hooks/useFunctions";

const PlayerSelection = () => {
	const {
		roomID,
		setRoomID,
		setRoomIsSelected,
		isOnePlayer,
		setIsOnePlayer,
		setLeftRoom,
		socket,
	} = useCheckContext();
	const { joinRoom } = useFunctions();
	useEffect(() => {
		localStorage.setItem("player-mode", JSON.stringify(isOnePlayer ? "single" : "dual"));
	}, [isOnePlayer]);

	/**todo: create remember id functionality 
	 * const [rememberID, setRememberID] = useState(false);

	useEffect(() => {
		if (rememberID) {
			localStorage.setItem("room-id", JSON.stringify(roomID));
		} else {
			localStorage.removeItem("room-id");
		}
	}, [rememberID]);

	useEffect(() => {
		if (rememberID) {
			localStorage.setItem("room-id", JSON.stringify(roomID));
		}
	}, [roomID]);*/

	// const savedID = JSON.parse(localStorage.getItem("room-id"));
	return (
		<form
			className="selection"
			onSubmit={(e) => {
				e.preventDefault();
				roomID && joinRoom(socket, roomID, setLeftRoom);
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
							joinRoom(socket, roomID, setLeftRoom);
							setRoomIsSelected(true);
							setIsOnePlayer(false);
						}
					}}
					to={roomID && "/"}
				>
					JOIN ROOM
				</Link>

				{/* <div className="remember">
					<input
						type="checkbox"
						checked={savedID && true}
						onChange={() => setRememberID(!rememberID)}
					/>
					<span>Remember this ID?</span>
				</div> */}

				{/* <div className="popup">
					<h3>Do you want to save </h3>
				</div> */}

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
