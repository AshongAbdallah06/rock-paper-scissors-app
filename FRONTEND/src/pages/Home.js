import React, { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import Chat from "../components/Chat";
import ScoreBoard from "../components/ScoreBoard";
import GameBoard from "../GameBoard";
import useCheckContext from "../hooks/useCheckContext";
import CopiedAlert from "../components/CopiedAlert";
import BonusDialog from "../components/bonus/Dialog";
import Nav from "../components/Nav";

const Home = () => {
	const [chatIsShowing, setChatIsShowing] = useState(false);
	const { roomID, isOnePlayer, setIsRulesModalShow, moveAck, leftRoom } = useCheckContext();

	useEffect(() => {
		localStorage.setItem("player-mode", JSON.stringify(isOnePlayer ? "single" : "dual"));
	}, [isOnePlayer]);

	const showModal = () => {
		setIsRulesModalShow(true);
	};

	const [showCopiedAlert, setShowCopiedAlert] = useState(false);
	const [showWhoLeft, setShowWhoLeft] = useState(false);

	useEffect(() => {
		setShowCopiedAlert(true);

		setTimeout(() => {
			setShowCopiedAlert(false);
		}, 2000);
	}, []);

	useEffect(() => {
		setShowWhoLeft(true);

		setTimeout(() => {
			setShowWhoLeft(false);
		}, 2000);
	}, [leftRoom !== false]);

	const bonus = JSON.parse(localStorage.getItem("bonus"));

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
			{/* {isOnePlayer && (
				<Link
					to="/leaderboard"
					className="leaderboard-link"
				>
					Leaderboard
				</Link>
			)} */}
			{chatIsShowing ? <Chat setChatIsShowing={setChatIsShowing} /> : ""}
			<footer>
				{!isOnePlayer && <p>Room Name: {roomID}</p>}
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
