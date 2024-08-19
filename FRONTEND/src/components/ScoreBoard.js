import React, { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import plane from "../images/paper-plane-outline.svg";
import useCheckContext from "../hooks/useCheckContext";
import Axios from "axios";

const ScoreBoard = ({ chatIsShowing, setChatIsShowing }) => {
	const { roomID, score, p1Score, p2Score, setP1Score, setP2Score, isOnePlayer, socket } =
		useCheckContext();
	const user = JSON.parse(localStorage.getItem("user"));

	const updateScore = async () => {
		try {
			await Axios.patch(`http://localhost:4001/api/user/scores/${user.username}`, { score });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		updateScore();
	}, [score]);

	const [p1Username, setP1Username] = useState("");
	const [p2Username, setP2Username] = useState("");

	useEffect(() => {
		setP1Score(JSON.parse(localStorage.getItem(`${roomID}-p1score`)) || 0);
		setP2Score(JSON.parse(localStorage.getItem(`${roomID}-p2score`)) || 0);
	}, []);

	useEffect(() => {
		if (user?.username) {
			socket.emit("username", user.username);
		}

		socket.on("updateUsernames", ({ p1Username, p2Username }) => {
			setP1Username(p1Username);
			setP2Username(p2Username);
			localStorage.setItem("usernames", JSON.stringify({ p1Username, p2Username }));
		});

		// Cleanup on unmount
		return () => {
			socket.off("updateUsernames");
		};
	}, []);

	return (
		<>
			<section className="scoreBoard">
				<div className="imgCont">
					<img
						src={logo}
						alt="logo"
					/>
				</div>
				{isOnePlayer ? (
					<div className="score">
						<p>score</p>
						<p>{score}</p>
					</div>
				) : (
					<div className="p2">
						<div className="score">
							{/* <p>Player1</p> */}
							<p>{p1Username}</p>
							<p>{p1Score}</p>
						</div>
						<div className="score">
							{/* <p>Player2</p> */}
							<p>{p2Username}</p>
							<p>{p2Score}</p>
						</div>
					</div>
				)}
			</section>

			{!isOnePlayer && !chatIsShowing ? (
				<div
					className="menu"
					onClick={() => setChatIsShowing(!chatIsShowing)}
					title="Messages"
				>
					<img
						src={plane}
						alt="messages"
					/>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default ScoreBoard;
