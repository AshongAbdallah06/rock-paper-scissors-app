import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useContextProvider from "../hooks/useContextProvider";
import useFunctions from "../hooks/useFunctions";
import copyIcon from "../images/copy-regular.svg";

const PlayerSelection = () => {
	const {
		roomID,
		setRoomID,
		setRoomIsSelected,
		isOnePlayer,
		setIsOnePlayer,
		bonusState,
		socket,
		user,
	} = useContextProvider();
	const { joinRoom } = useFunctions();

	const inputRef = useRef(null);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
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
				roomID && !isOnePlayer && joinRoom(socket, roomID, bonusState);
				roomID && setRoomIsSelected(true);
			}}
		>
			<div className="room">
				<div
					className="input-cont"
					onClick={() => {
						inputRef.current && inputRef.current.focus();
					}}
				>
					<input
						ref={inputRef}
						type="text"
						onChange={(e) => setRoomID(e.target.value)}
						className="room-input"
						maxLength={10}
						defaultValue={roomID || ""}
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

				<Link
					className="btn join"
					onClick={() => {
						if (roomID) {
							!isOnePlayer && joinRoom(socket, roomID, bonusState);
							setRoomIsSelected(true);
							setIsOnePlayer(false);
						} else if (roomID === "") {
							alert("Please enter an ID for the room");
						}
					}}
					to={roomID ? "/" : ""}
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
				</div>
			</div>
		</form>
	);
};

export default PlayerSelection;
