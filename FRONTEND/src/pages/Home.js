import React, { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import Chat from "../components/Chat";
import ScoreBoard from "../components/ScoreBoard";
import GameBoard from "../GameBoard";
import useCheckContext from "../hooks/useCheckContext";
import { Link } from "react-router-dom";

const Home = () => {
	const [chatIsShowing, setChatIsShowing] = useState(false);
	const { roomID, isOnePlayer, setIsRulesModalShow } = useCheckContext();

	useEffect(() => {
		localStorage.setItem("player-mode", JSON.stringify(isOnePlayer ? "single" : "dual"));
	}, [isOnePlayer]);

	const showModal = () => {
		setIsRulesModalShow(true);
	};

	return (
		<>
			<ScoreBoard
				setChatIsShowing={setChatIsShowing}
				chatIsShowing={chatIsShowing}
			/>

			<Link
				style={{ color: "white" }}
				onClick={() => {
					localStorage.removeItem("player-mode");
					console.log("Removed");
					window.location.href = "/";
				}}
			>
				Change Mode
			</Link>

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
