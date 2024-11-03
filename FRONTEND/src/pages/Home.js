import React, { useEffect, useState } from "react";
import AlertComponent from "../components/AlertComponent";
import BonusDialog from "../components/bonus/Dialog";
import ChangeMode from "../components/ChangeMode";
import Chat from "../components/Chat";
import Dialog from "../components/Dialog";
import DualPlayerStats from "../components/DualPlayerStats";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ScoreBoard from "../components/ScoreBoard";
import GameBoard from "../GameBoard";
import useContextProvider from "../hooks/useContextProvider";
import useFunctions from "../hooks/useFunctions";

const Home = () => {
	const [chatIsShowing, setChatIsShowing] = useState(false);
	const {
		isOnePlayer,
		moveAck,
		leftRoom,
		socket,
		user,
		setIsRulesModalShow,
		alertCounter,
		setAlertCounter,
		roomID,
		bonusState,
		userExists,
	} = useContextProvider();
	const { getStorageItem } = useFunctions();

	useEffect(() => {
		localStorage.setItem("player-mode", JSON.stringify(isOnePlayer ? "single" : "dual"));
	}, [isOnePlayer]);

	const [showWhoLeft, setShowWhoLeft] = useState(false);

	const hasLeftRoom = leftRoom && leftRoom.includes("has left the room");
	useEffect(() => {
		setShowWhoLeft(true);

		setTimeout(() => {
			setShowWhoLeft(false);
		}, 2000);
	}, [hasLeftRoom]);

	const [renderRoutes, setRenderRoutes] = useState(false);

	useEffect(() => {
		if (alertCounter === 0) {
			setAlertCounter(alertCounter + 1);
			alert(
				"Server may take a little time to respond; about a 50s to 1min. You may want to reload the page after 50s to refetch score accurately."
			);
		}

		setRenderRoutes(false);
		const timer = setTimeout(() => {
			setRenderRoutes(true);
		}, 100);

		socket.on("error-message", (msg) => {
			if (msg.error.includes("fk_username")) {
				localStorage.removeItem("user");
				window.location.href = "/login";
			}
		});

		if (!localStorage.getItem("bonus")) {
			localStorage.setItem("bonus", JSON.stringify(false));
		}

		return () => {
			socket.off("join-room");
			clearTimeout(timer);
		};
	}, []);

	const [messages, setMessages] = useState(
		userExists && getStorageItem(`room-${roomID}-${user.username}-messages`, [])
	);

	useEffect(() => {
		userExists &&
			localStorage.setItem(
				`room-${roomID}-${user.username}-messages`,
				JSON.stringify(messages)
			);
	}, [messages]);

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
			setShowMessageAlert(true);

			setTimeout(() => {
				setShowMessageAlert(false);
			}, 5000);
		});

		return () => {
			socket.off("message");
		};
	}, [socket]);

	const [showMessageAlert, setShowMessageAlert] = useState(false);

	useEffect(() => {
		localStorage.setItem("alertCounter", JSON.stringify(alertCounter));
	}, [alertCounter]);

	const [sidebarIsShowing, setSidebarIsShowing] = useState(false);
	const [showDualPlayerStats, setShowDualPlayerStats] = useState(false);
	const [showChangeModePopup, setShowChangeModePopup] = useState(false);

	return (
		<>
			{renderRoutes && (
				<>
					{showDualPlayerStats && (
						<DualPlayerStats setShowDualPlayerStats={setShowDualPlayerStats} />
					)}

					<Nav
						sidebarIsShowing={sidebarIsShowing}
						setSidebarIsShowing={setSidebarIsShowing}
					/>

					{!isOnePlayer && showMessageAlert && !chatIsShowing && (
						<AlertComponent
							message="You have a new message"
							message1="Click here to view."
							setChatIsShowing={setChatIsShowing}
							messages={messages}
						/>
					)}

					{!isOnePlayer && moveAck && <p className="alert">{moveAck}</p>}
					{!isOnePlayer && leftRoom && showWhoLeft && <p className="alert">{leftRoom}</p>}

					<ScoreBoard />

					<GameBoard />

					{showChangeModePopup && (
						<ChangeMode
							setShowChangeModePopup={setShowChangeModePopup}
							setSidebarIsShowing={setSidebarIsShowing}
						/>
					)}
					{!bonusState ? <Dialog /> : <BonusDialog />}
					{chatIsShowing && (
						<Chat
							setMessages={setMessages}
							setChatIsShowing={setChatIsShowing}
							messages={messages}
							setShowMessageAlert={setShowMessageAlert}
						/>
					)}

					{sidebarIsShowing && (
						<Footer
							user={user}
							setSidebarIsShowing={setSidebarIsShowing}
							setChatIsShowing={setChatIsShowing}
							chatIsShowing={chatIsShowing}
							setShowDualPlayerStats={setShowDualPlayerStats}
							setShowChangeModePopup={setShowChangeModePopup}
						/>
					)}

					<button
						className="rules-btn"
						onClick={() => setIsRulesModalShow(true)}
					>
						RULES
					</button>
				</>
			)}
		</>
	);
};

export default Home;
