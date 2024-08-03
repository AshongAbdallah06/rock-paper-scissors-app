import React, { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import Chat from "../components/Chat";
import ScoreBoard from "../components/ScoreBoard";
import GameBoard from "../GameBoard";
import useCheckContext from "../hooks/useCheckContext";

const Home = () => {
	const [chatIsShowing, setChatIsShowing] = useState(false);
	const { roomID, isOnePlayer, authorize } = useCheckContext();

	// useEffect(() => {
	// 	authorize();
	// }, []);

	return (
		<>
			<ScoreBoard
				setChatIsShowing={setChatIsShowing}
				chatIsShowing={chatIsShowing}
			/>

			<GameBoard />
			<Dialog />

			{chatIsShowing ? <Chat setChatIsShowing={setChatIsShowing} /> : ""}

			{!isOnePlayer && <footer>Room Name: {roomID}</footer>}
		</>
	);
};

export default Home;
