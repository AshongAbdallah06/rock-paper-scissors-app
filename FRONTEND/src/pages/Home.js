import React, { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import Chat from "../components/Chat";
import ScoreBoard from "../components/ScoreBoard";
import GameBoard from "../GameBoard";
import useCheckContext from "../hooks/useCheckContext";
import CopiedAlert from "../components/CopiedAlert";
import BonusDialog from "../components/bonus/Dialog";
import Nav from "../components/Nav";
import copyIcon from "../images/copy-regular.svg";
import Axios from "axios";
import useFunctions from "../hooks/useFunctions";

const Home = () => {
	const [chatIsShowing, setChatIsShowing] = useState(false);
	const {
		roomID,
		isOnePlayer,
		setIsRulesModalShow,
		moveAck,
		leftRoom,
		setLeftRoom,
		setScore,
		socket,
	} = useCheckContext();
	const { joinRoom } = useFunctions();

	useEffect(() => {
		localStorage.setItem("player-mode", JSON.stringify(isOnePlayer ? "single" : "dual"));
	}, [isOnePlayer]);

	const showModal = () => {
		setIsRulesModalShow(true);
	};

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

	const copyRoomID = async () => {
		try {
			await navigator.clipboard.writeText(roomID);
			await navigator.clipboard.readText();

			setShowCopiedAlert(true);

			setTimeout(() => {
				setShowCopiedAlert(false);
			}, 2000);
		} catch (error) {
			console.log("🚀 ~ copyRoomID ~ error:", error);
		}
	};

	const user = JSON.parse(localStorage.getItem("user"));

	const [stats, setStats] = useState({
		score: null,
		games_played: null,
		last_played: null,
		loses: null,
		ties: null,
		wins: null,
	});
	const getUserStats = async () => {
		try {
			console.log("🚀 ~ getScores ~ Attempting to fetch scores");
			const res = await Axios.get(`http://localhost:4001/api/user/stats/${user.username}`);
			const data = res.data[0];

			setStats({
				score: data.score,
				games_played: data.games_played,
				last_played: data.last_played,
				loses: data.loses,
				ties: data.ties,
				wins: data.wins,
			});

			setScore(data?.score);
			console.log("🚀 ~ getScores ~ Success:", data.score);
		} catch (error) {
			console.error("🚀 ~ getScores ~ error:", error);
		}
	};

	useEffect(() => {
		getUserStats();

		socket.on("updateScore", (score) => {
			setTimeout(() => {
				setScore(score);
			}, 3000);
		});

		socket.on("error-message", (msg) => {
			console.log("Message: ", msg);

			if (msg.error.includes("fk_username")) {
				localStorage.removeItem("user");
				window.location.href = "/login";
			}
		});

		joinRoom(socket, user.username, setLeftRoom);
	}, []);

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
			{chatIsShowing ? <Chat setChatIsShowing={setChatIsShowing} /> : ""}
			<footer>
				{!isOnePlayer && (
					<div
						className="room-name"
						onClick={copyRoomID}
					>
						<p>Room ID: {roomID}</p>
						<img
							src={copyIcon}
							alt="copyIcon"
							className="copy-icon"
							title="copy"
						/>
					</div>
				)}
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
