import React, { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import Chat from "../components/Chat";
import ScoreBoard from "../components/ScoreBoard";
import GameBoard from "../GameBoard";
import useCheckContext from "../hooks/useCheckContext";
import CopiedAlert from "../components/CopiedAlert";
import BonusDialog from "../components/bonus/Dialog";
import Nav from "../components/Nav";
import copyIcon from "../images/copy-regular.svg";
import Axios from "axios";
import useFunctions from "../hooks/useFunctions";

const Home = () => {
	const [chatIsShowing, setChatIsShowing] = useState(false);
	const { roomID, isOnePlayer, setIsRulesModalShow, moveAck, leftRoom, setLeftRoom, socket } =
		useCheckContext();
	const { joinRoom } = useFunctions();

	useEffect(() => {
		localStorage.setItem("player-mode", JSON.stringify(isOnePlayer ? "single" : "dual"));
	}, [isOnePlayer]);

	const showModal = () => {
		setIsRulesModalShow(true);
	};

	const [showCopiedAlert, setShowCopiedAlert] = useState(false);
	const [showWhoLeft, setShowWhoLeft] = useState(false);

	const hasLeftRoom = leftRoom !== false;
	useEffect(() => {
		setShowWhoLeft(true);

		setTimeout(() => {
			setShowWhoLeft(false);
		}, 2000);
	}, [hasLeftRoom]);

	const bonus = JSON.parse(localStorage.getItem("bonus"));

	const copyRoomID = async () => {
		try {
			await navigator.clipboard.writeText(roomID);
			await navigator.clipboard.readText();

			setShowCopiedAlert(true);

			setTimeout(() => {
				setShowCopiedAlert(false);
			}, 2000);
		} catch (error) {
			console.log("🚀 ~ copyRoomID ~ error:", error);
		}
	};

	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		if (isOnePlayer) {
			socket.on("error-message", (msg) => {
				if (msg.error.includes("fk_username")) {
					localStorage.removeItem("user");
					window.location.href = "/login";
				}
			});

			joinRoom(socket, user.username, setLeftRoom);
		}

		if (!isOnePlayer) {
			socket.on("deleteUsernames", () => {
				localStorage.removeItem("usernames");
			});
		}

		return () => {
			socket.off("join_room");
		};
	}, []);

	return (
		<>
			<Nav />

			{!isOnePlayer && showCopiedAlert && <CopiedAlert />}
			{!isOnePlayer && moveAck && <p className="copied-alert">{moveAck.msg}</p>}
			{!isOnePlayer && leftRoom && showWhoLeft && <p className="copied-alert">{leftRoom}</p>}

			<ScoreBoard
				setChatIsShowing={setChatIsShowing}
				chatIsShowing={chatIsShowing}
			/>

			<GameBoard />
			{!bonus ? <Dialog /> : <BonusDialog />}
			{chatIsShowing ? <Chat setChatIsShowing={setChatIsShowing} /> : ""}
			<footer>
				{!isOnePlayer && (
					<div
						className="room-name"
						onClick={copyRoomID}
					>
						<p>Room ID: {roomID}</p>
						<img
							src={copyIcon}
							alt="copyIcon"
							className="copy-icon"
							title="copy"
						/>
					</div>
				)}
				<button
					className="rules"
					onClick={showModal}
				>
					RULES
				</button>
			</footer>
		</>
	);
};

export default Home;
