import React, { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import Chat from "../components/Chat";
import ScoreBoard from "../components/ScoreBoard";
import GameBoard from "../GameBoard";
import useCheckContext from "../hooks/useCheckContext";
import CopiedAlert from "../components/CopiedAlert";
import BonusDialog from "../components/bonus/Dialog";
import Nav from "../components/Nav";
import useFunctions from "../hooks/useFunctions";
import Footer from "../components/Footer";

const Home = () => {
	const [chatIsShowing, setChatIsShowing] = useState(false);
	const { isOnePlayer, moveAck, leftRoom, setLeftRoom, socket } = useCheckContext();
	const { joinRoom } = useFunctions();

	useEffect(() => {
		localStorage.setItem("player-mode", JSON.stringify(isOnePlayer ? "single" : "dual"));
	}, [isOnePlayer]);

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

	const [sidebarIsShowing, setSidebarIsShowing] = useState(false);
	const [bonusState, setBonusState] = useState(bonus);

	return (
		<>
			{renderRoutes && (
				<>
					<Nav
						sidebarIsShowing={sidebarIsShowing}
						setSidebarIsShowing={setSidebarIsShowing}
					/>

					{!isOnePlayer && showCopiedAlert && <CopiedAlert />}
					{!isOnePlayer && moveAck && <p className="copied-alert">{moveAck.msg}</p>}
					{!isOnePlayer && leftRoom && showWhoLeft && (
						<p className="copied-alert">{leftRoom}</p>
					)}

					<ScoreBoard />

					<GameBoard
						bonusState={bonusState}
						setBonusState={setBonusState}
					/>

					{!bonusState ? <Dialog /> : <BonusDialog />}
					{chatIsShowing ? <Chat setChatIsShowing={setChatIsShowing} /> : ""}

					{sidebarIsShowing && (
						<Footer
							setShowCopiedAlert={setShowCopiedAlert}
							user={user}
							setSidebarIsShowing={setSidebarIsShowing}
							setChatIsShowing={setChatIsShowing}
							chatIsShowing={chatIsShowing}
							bonusState={bonusState}
							setBonusState={setBonusState}
						/>
					)}
				</>
			)}
		</>
	);
};

export default Home;
