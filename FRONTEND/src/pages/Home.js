import React, { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import Chat from "../components/Chat";
import ScoreBoard from "../components/ScoreBoard";
import GameBoard from "../GameBoard";
import useCheckContext from "../hooks/useCheckContext";
import CopiedAlert from "../components/CopiedAlert";

const Home = () => {
	const [chatIsShowing, setChatIsShowing] = useState(false);
	const { roomID, isOnePlayer, setIsRulesModalShow, moveAck } = useCheckContext();

	useEffect(() => {
		localStorage.setItem("player-mode", JSON.stringify(isOnePlayer ? "single" : "dual"));
	}, [isOnePlayer]);

	const showModal = () => {
		setIsRulesModalShow(true);
	};

	const [showCopiedAlert, setShowCopiedAlert] = useState(false);

	useEffect(() => {
		setShowCopiedAlert(true);

		setTimeout(() => {
			setShowCopiedAlert(false);
		}, 2000);
	}, []);

	return (
		<>
			{!isOnePlayer && showCopiedAlert && <CopiedAlert />}
			{!isOnePlayer && moveAck && <p className="copied-alert">{moveAck.msg}</p>}

			<ScoreBoard
				setChatIsShowing={setChatIsShowing}
				chatIsShowing={chatIsShowing}
			/>

			<p
				className="change-mode-abs"
				onClick={() => {
					localStorage.removeItem("player-mode");
					window.location.href = "/";
				}}
			>
				Change Mode
			</p>

			<GameBoard />
			<Dialog />

			{/* {isOnePlayer && (
				<Link
					to="/leaderboard"
					className="leaderboard-link"
				>
					Leaderboard
				</Link>
			)} */}

			{chatIsShowing ? <Chat setChatIsShowing={setChatIsShowing} /> : ""}

			{!isOnePlayer && (
				<footer>
					<p>Room Name: {roomID}</p>

					<button
						className="rules"
						onClick={showModal}
					>
						RULES
					</button>
				</footer>
			)}
		</>
	);
};

export default Home;
