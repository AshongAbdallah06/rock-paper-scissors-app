import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";
import useFunctions from "../hooks/useFunctions";

const PlayerSelection = () => {
	const { roomID, setRoomID, setRoomIsSelected, setIsOnePlayer, setLeftRoom, socket } =
		useCheckContext();
	const { joinRoom } = useFunctions();

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

	const inputRef = useRef();
	useEffect(() => {
		socket.emit("active-rooms");
		inputRef.current.focus();
	}, []);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				roomID && joinRoom(socket, roomID, setLeftRoom);
				roomID && setRoomIsSelected(true);
			}}
		>
			<div className="room">
				<div
					className="input-cont"
					onClick={() => {
						inputRef.current.focus();
					}}
				>
					<input
						ref={inputRef}
						type="text"
						onChange={(e) => setRoomID(e.target.value)}
						className="room-input"
						maxLength={10}
						defaultValue={roomID}
						placeholder="Type in here"
					/>
					<p> {roomID ? `ID: ${roomID} ` : "Hover to enter ID"}</p>
				</div>

				<Link
					className="btn join"
					onClick={() => {
						if (roomID) {
							joinRoom(socket, roomID, setLeftRoom);
							setRoomIsSelected(true);
							setIsOnePlayer(false);
							socket.emit("active-rooms");
						} else if (roomID === "") {
							alert("Please enter an ID for the room");
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

				{/* <span className="or">OR</span> */}

				<div className="links">
					<Link
						to="/select-player-mode"
						className="change-mode"
						style={{ marginTop: "1rem" }}
						onClick={() => {
							localStorage.removeItem("player-mode");
						}}
					>
						Change Mode
					</Link>
					<Link
						className="change-mode"
						onClick={() => {
							socket.emit("active-rooms");
						}}
						to="/available-rooms"
					>
						See Active Rooms
					</Link>
				</div>
			</div>
		</form>
	);
};

export default PlayerSelection;
