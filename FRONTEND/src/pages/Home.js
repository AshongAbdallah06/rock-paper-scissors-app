import React, { useState } from "react";
import Dialog from "../components/Dialog";
import Chat from "../components/Chat";
import ScoreBoard from "../components/ScoreBoard";
import GameBoard from "../GameBoard";
import useCheckContext from "../hooks/useCheckContext";
import { Link } from "react-router-dom";

const Home = () => {
	const [chatIsShowing, setChatIsShowing] = useState(false);
	const { roomID, isOnePlayer } = useCheckContext();

	return (
		<>
			<ScoreBoard
				setChatIsShowing={setChatIsShowing}
				chatIsShowing={chatIsShowing}
			/>

			<GameBoard />
			<Dialog />

			<Link
				to="/leaderboard"
				className="leaderboard-link"
			>
				Leaderboard
			</Link>

			{chatIsShowing ? <Chat setChatIsShowing={setChatIsShowing} /> : ""}

			{!isOnePlayer && <footer>Room Name: {roomID}</footer>}
		</>
	);
};

export default Home;
