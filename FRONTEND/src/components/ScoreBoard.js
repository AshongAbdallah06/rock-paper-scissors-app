import React, { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import plane from "../images/paper-plane-outline.svg";
import trophy from "../images/trophy-outline.svg";
import useCheckContext from "../hooks/useCheckContext";
import Axios from "axios";
import { Link } from "react-router-dom";

const ScoreBoard = ({ chatIsShowing, setChatIsShowing }) => {
	const { roomID, score, p1Score, p2Score, setP1Score, setP2Score, isOnePlayer, socket } =
		useCheckContext();
	const user = JSON.parse(localStorage.getItem("user"));

	const [userScore, setUserScore] = useState("");

	const updateScore = async () => {
		console.log("DONE");
		try {
			// await Axios.patch(`http://192.168.8.195:4001/api/user/scores/${user.username}`, {
			await Axios.patch(`http://localhost:4001/api/user/scores/${user.username}`, {
				userScore,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getUserScore = async () => {
		try {
			console.log("🚀 ~ getScores ~ Attempting to fetch scores");
			const res = await Axios.get(`http://localhost:4001/api/user/score/${user.username}`);
			const data = res.data[0];

			setUserScore(data.score);
			console.log("🚀 ~ getScores ~ Success:", data);
		} catch (error) {
			console.error("🚀 ~ getScores ~ error:", error);
		}
	};

	useEffect(() => {
		getUserScore();
	}, []);

	// useEffect(() => {
	// 	updateScore();
	// }, [userScore]);

	useEffect(() => {
		setTimeout(() => {
			updateScore();
		}, 2000);
	}, [score]);

	const usernames = JSON.parse(localStorage.getItem("usernames"));
	const [p1Username, setP1Username] = useState("");
	const [p2Username, setP2Username] = useState("");

	useEffect(() => {
		setP1Score(
			JSON.parse(
				localStorage.getItem(
					`${roomID + usernames?.p1Username + usernames?.p2Username}-p1score`
				)
			) || 0
		);
		setP2Score(
			JSON.parse(
				localStorage.getItem(
					`${roomID + usernames?.p1Username + usernames?.p2Username}-p2score`
				)
			) || 0
		);
	}, []);

	useEffect(() => {
		if (!isOnePlayer) {
			if (user?.username) {
				socket.emit("username", user.username);
			}
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
						<p>{userScore}</p>
					</div>
				) : (
					<div className="p2">
						<div className="score">
							{/* <p>Player1</p> */}
							<p>{!p1Username ? "Player1" : p1Username}</p>
							<p>{p1Username && p2Username ? p1Score : 0}</p>
						</div>
						<div className="score">
							{/* <p>Player2</p> */}
							<p>{!p2Username ? "Player2" : p2Username}</p>
							<p>{p1Username && p2Username ? p2Score : 0}</p>
						</div>
					</div>
				)}
			</section>

			{!isOnePlayer && !chatIsShowing && (
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
			)}

			{isOnePlayer && (
				<Link
					to="/leaderboard"
					className="menu"
					onClick={() => setChatIsShowing(!chatIsShowing)}
					title="Messages"
				>
					<img
						src={trophy}
						alt="messages"
						title="Leaderboard"
					/>
				</Link>
			)}
		</>
	);
};

export default ScoreBoard;
