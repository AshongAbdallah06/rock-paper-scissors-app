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
import DualPlayerStats from "../components/DualPlayerStats";
import Axios from "axios";

const Home = () => {
	const [chatIsShowing, setChatIsShowing] = useState(false);
	const { isOnePlayer, moveAck, leftRoom, setLeftRoom, socket, user, dualPlayerStats } =
		useCheckContext();
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

	const [renderRoutes, setRenderRoutes] = useState(false);

	const [opponentProfile, setOpponentProfile] = useState(null);
	const getUserProfiles = async () => {
		try {
			const res = await Axios.post(
				// "http://localhost:4001/api/user/profiles",
				"https://rock-paper-scissors-app-iybf.onrender.com/api/user/profiles",
				{
					p1Username:
						dualPlayerStats?.player1_username !== user?.username
							? dualPlayerStats?.player1_username
							: dualPlayerStats?.player2_username,
				}
			);
			const updatedUser = res.data;

			if (updatedUser) {
				setOpponentProfile(updatedUser[0]);
			}
		} catch (error) {
			if (error?.response?.status === 413) {
				alert("File too large");
			}
			console.log(error);
		}
	};
	useEffect(() => {
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

		if (isOnePlayer) {
			joinRoom(socket, user.username, setLeftRoom);
		} else {
			if (dualPlayerStats?.player1_username && dualPlayerStats?.player2_username)
				getUserProfiles();
		}

		if (!localStorage.getItem("bonus")) {
			localStorage.setItem("bonus", JSON.stringify(false));
		}

		return () => {
			socket.off("join-room");
			clearTimeout(timer);
		};
	}, []);

	const [sidebarIsShowing, setSidebarIsShowing] = useState(false);
	const [bonusState, setBonusState] = useState(!bonus ? false : true);
	const [showDualPlayerStats, setShowDualPlayerStats] = useState(false);

	return (
		<>
			{renderRoutes && (
				<>
					{showDualPlayerStats && (
						<DualPlayerStats
							setShowDualPlayerStats={setShowDualPlayerStats}
							opponentProfile={opponentProfile}
							getUserProfiles={getUserProfiles}
						/>
					)}
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

					<GameBoard bonusState={bonusState} />

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
							setShowDualPlayerStats={setShowDualPlayerStats}
						/>
					)}
				</>
			)}
		</>
	);
};

export default Home;
