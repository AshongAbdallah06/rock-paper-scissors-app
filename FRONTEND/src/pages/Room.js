import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";
import useFunctions from "../hooks/useFunctions";
import copyIcon from "../images/copy-regular.svg";
import CopiedAlert from "../components/CopiedAlert";

const PlayerSelection = () => {
	const {
		roomID,
		setRoomID,
		setRoomIsSelected,
		setIsOnePlayer,
		isOnePlayer,
		setLeftRoom,
		socket,
		user,
	} = useCheckContext();
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
	const [showCopiedAlert, setShowCopiedAlert] = useState(false);

	const copyInviteLink = async () => {
		try {
			await navigator.clipboard.writeText(
				`Your friend ${user?.username}, is inviting you to a game of rock-paper-scissors. Click on the link below to play against each other. \n \n https://rock-paper-scissors-app-iybf.onrender.com\n \n1. Click on Dual to enable 2-player mode.\n2. Enter the code '${roomID}' and click on Join Room to play against each other`
			);

			await navigator.clipboard.readText();

			setShowCopiedAlert(true);

			setTimeout(() => {
				setShowCopiedAlert(false);
			}, 2000);
		} catch (error) {
			console.log("🚀 ~ copyInviteLink ~ error:", error);
			alert("Error copying link. Check the console to see what occurred.");
		}
	};
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

					<div onClick={() => roomID && copyInviteLink()}>
						<img
							src={copyIcon}
							alt="copyIcon"
							className="copy-icon"
							title="copy"
						/>
					</div>
				</div>
				{!isOnePlayer && showCopiedAlert && <CopiedAlert />}

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
						className="link-item"
						style={{ marginTop: "1rem" }}
						onClick={() => {
							localStorage.removeItem("player-mode");
						}}
					>
						Change Mode
					</Link>
					<Link
						className="link-item"
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
