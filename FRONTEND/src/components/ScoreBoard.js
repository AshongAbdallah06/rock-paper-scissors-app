import React, { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import useCheckContext from "../hooks/useCheckContext";

const ScoreBoard = () => {
	const {
		roomID,
		isOnePlayer,
		socket,
		getUserStats,
		getPlayerStats,
		currentUserStats,
		dualPlayerStats,
		result,
	} = useCheckContext();

	const user = JSON.parse(localStorage.getItem("user"));

	const usernames = JSON.parse(localStorage.getItem("usernames"));
	const [p1Username, setP1Username] = useState("");
	const [p2Username, setP2Username] = useState("");

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

		isOnePlayer
			? getUserStats(user?.username)
			: getPlayerStats(usernames?.p1Username, usernames?.p2Username);

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
						<p>{currentUserStats.wins}</p>
					</div>
				) : (
					<div className="p2">
						<div className="score">
							{/* <p>Player1</p> */}
							{/* <p>{!p1Username ? "Player1" : p1Username}</p> */}
							<p>{p1Username === user.username ? "You" : p1Username}</p>
							<p>
								{p1Username && p2Username
									? dualPlayerStats?.player1_username === p1Username
										? dualPlayerStats?.player1_wins
										: dualPlayerStats.player2_username === p1Username &&
										  dualPlayerStats?.player2_wins
									: 0}

								{!dualPlayerStats && 0}
							</p>
						</div>
						<div className="score">
							{/* <p>Player2</p> */}
							{/* <p>{!p2Username ? "Player2" : p2Username}</p> */}
							<p>{p2Username === user.username ? "You" : p2Username}</p>
							{/* <p>{p1Username && p2Username ? p2Score : 0}</p> */}
							<p>
								{p1Username && p2Username
									? dualPlayerStats.player1_username === p2Username
										? dualPlayerStats?.player1_wins
										: dualPlayerStats.player2_username === p2Username &&
										  dualPlayerStats?.player2_wins
									: 0}

								{!dualPlayerStats && 0}
							</p>
						</div>
					</div>
				)}
			</section>
		</>
	);
};

export default ScoreBoard;
