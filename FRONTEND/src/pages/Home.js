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

	const [renderRoutes, setRenderRoutes] = useState(false);
	useEffect(() => {
		setRenderRoutes(false);
		const timer = setTimeout(() => {
			setRenderRoutes(true);
		}, 100);

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
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			{renderRoutes && (
				<>
					<Nav />

					{!isOnePlayer && showCopiedAlert && <CopiedAlert />}
					{!isOnePlayer && moveAck && <p className="copied-alert">{moveAck.msg}</p>}
					{!isOnePlayer && leftRoom && showWhoLeft && (
						<p className="copied-alert">{leftRoom}</p>
					)}

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
			)}
		</>
		// <>
		// 	{/* <button class="Btn">
		// 		<div class="sign">
		// 			<svg viewBox="0 0 512 512">
		// 				<path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
		// 			</svg>
		// 		</div>

		// 		<div class="text">Logout</div>
		// 	</button> */}
		// </>
	);
};

export default Home;
