import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useContextProvider from "../../hooks/useContextProvider";
import arrowBack from "../../images/arrow-back-outline.svg";
import arrowForward from "../../images/arrow-forward-outline.svg";
import demo4Normal from "../../images/dual-play-home-bonus.png";
import demo4Bonus from "../../images/dual-play-home-normal.png";
import bonusRules from "../../images/image-rules-bonus.svg";
import demo5 from "../../images/live-chat.png";
import video from "../../images/outcomes/Leaderboard.mp4";
import profileView from "../../images/profile.png";
import demo3 from "../../images/room-id.png";
import demo1 from "../../images/select-change-mode.png";
import demo2 from "../../images/select-dual.png";

const Other = ({ setPage, feature, setFeature, docsContentRef, setSearchParams }) => {
	const [gameMode, setGameMode] = useState("normal");
	const profileRef = useRef(null);
	const modesRef = useRef(null);
	const leaderboardRef = useRef("leaderboard");
	const liveChatRef = useRef("live-chat");
	const { userExists } = useContextProvider();

	useEffect(() => {
		if (feature === "leaderboard") {
			leaderboardRef.current.scrollIntoView({
				top: 0,
				behavior: "smooth",
			});
			setSearchParams((params) => ({ ...params, feature }));
		} else if (feature === "profile") {
			profileRef.current.scrollIntoView({
				top: 0,
				behavior: "smooth",
			});
			setSearchParams((params) => ({ ...params, feature }));
		} else if (feature === "modes") {
			modesRef.current.scrollIntoView({
				top: 0,
				behavior: "smooth",
			});
			setSearchParams((params) => ({ ...params, feature }));
		} else if (feature === "live-chat") {
			liveChatRef.current.scrollIntoView({
				top: 0,
				behavior: "smooth",
			});
			setSearchParams((params) => ({ ...params, feature }));
		}
	}, [feature]);

	return (
		<>
			<div ref={docsContentRef} />
			<section ref={leaderboardRef}>
				<div className="feature-header">
					<h1>View Live Leaderboard</h1>
				</div>
				<p>
					The Live Leaderboard is where you can track your progress and see how you rank
					against other players in real-time. It gives you real-time information about
					your game-play. We have also added a well-implemented feature that lets you
					filter the displays on the leaderboard by other categories such as wins, losses,
					ties, and the number of games played.
				</p>
				<p>
					Players are ranked by their performance(wins) by default, with players with most
					wins earning spots at the very top of the list. Filtering the list will yield
					different results and players with higher(wins, losses, ties, games played) will
					earn the spot at the very top based on the filter chosen.
				</p>

				<video
					src={video}
					className="outcomes"
					controls={false}
					autoPlay={true}
					muted={true}
				/>
			</section>

			<section ref={profileRef}>
				<div className="feature-header">
					<h1>View Your Profile</h1>
				</div>
				<p>
					Your profile page is where you get detailed information about your game-play.
					There are more things to discover on this page. It provides you with detailed
					stats, such as win/loss ratio, most picked moves, streaks(wins, losses, ties),
					and many more.
				</p>

				<span>
					<b>You can access your profile page via the Home page by:</b>
					<ul>
						<li>
							Clicking on the <b>Menu</b> button on you upper right corner to show the
							menu bar.
						</li>
						<li>
							Click on <b>My Profile</b> to navigate to your Profile page
						</li>
					</ul>
				</span>

				<p>
					<li>
						You can also access it via the <b>Leaderboard </b>
						page by clicking on <b>View Profile</b> located just at the top of the
						display box.
					</li>
					<li>
						Clicking on your username in the
						<b> Leaderboard</b> display will navigate you to your <b>Profile </b>page.
					</li>
				</p>

				<img
					src={profileView}
					className="outcomes"
					alt=""
				/>
			</section>

			<section ref={modesRef}>
				<div className="feature-header">
					<h1>Game & Player Modes</h1>
				</div>
				<p>
					There are two(2) player modes and also two(2) game modes in this
					rock-paper-scissors game to make it more fun and entertaining for players.
				</p>
				<ul>
					<li>
						<b>Player Modes</b>
					</li>
					<p>
						<b>Single Player</b>: In this mode, you are challenged by a smart computer
						who tries to counter your moves wisely. Click{" "}
						<Link
							className="here"
							onClick={() => setPage("introduction")}
							to="/help?page=introduction"
						>
							here
						</Link>{" "}
						to know more about this mode. Click here to{" "}
						<Link
							to="/select-player-mode"
							onClick={() => {
								localStorage.removeItem("player-mode");
								localStorage.removeItem("usernames");
							}}
							className="here"
						>
							Play Now
						</Link>
						.
					</p>
					<p>
						<b>Dual Player</b>: Also widely known as two-player mode. In this mode, you
						can invite your friends to challenge them to game of rock-paper-scissors by
						creating and joining a room.{" "}
						<Link
							onClick={() => setPage("introduction")}
							className="here"
							to="/help?page=introduction"
						>
							Rules
						</Link>{" "}
						for single player also apply here.
					</p>
					<div>
						<p>
							- To begin playing dual mode, click on <b>Change Mode</b> on the Menu
							bar and select <b>Dual.</b>
						</p>
						<img
							className="outcomes"
							src={demo1}
							alt="Clicking on Change Mode in the menu bar on the Home page"
						/>
						<img
							className="outcomes"
							src={demo2}
							alt="Clicking on Change Mode in the menu bar on the Home page"
						/>

						<p>
							- You will be navigated to a screen to enter a room ID. You can enter
							any ID between 5 and 20. Click on the <b>JOIN ROOM</b> button after
							entering the ID.{" "}
							<em>
								i.e. Room ID allows two players to play against each other in dual
								player mode.
							</em>
						</p>
						<img
							className="outcomes"
							src={demo3}
							alt="Clicking on Change Mode in the menu bar on the Home page"
						/>
						<p>
							Share the code with your opponent to play against them.{" "}
							<Link
								to="/select-player-mode"
								onClick={() => {
									localStorage.removeItem("player-mode");
									localStorage.removeItem("usernames");
								}}
								className="here"
							>
								Play Now
							</Link>
						</p>
					</div>

					<li>
						<b>Game Modes</b>
					</li>
					<p>
						<b>Normal</b>: In this mode, you are challenged by a smart computer who
						tries to counter your moves wisely. Click{" "}
						<Link
							to="/help?page=introduction"
							className="here"
							onClick={() => setPage("introduction")}
						>
							here
						</Link>{" "}
						to know more about this mode. Click here to{" "}
						<Link
							onClick={() => {
								localStorage.setItem("bonus", false);
							}}
							to="/"
							className="here"
						>
							{" "}
							Try it Now
						</Link>
						.
					</p>

					<p>
						<b>Bonus</b>: This mode comes with an extra set of hands.{" "}
						<b>
							That's right! You heard me. i.e. <i>Lizard</i> and <i>Spock.</i> This is
							to make the game more interesting and not limited to just three hands.
						</b>{" "}
						With this game mode comes additional set of rules.{" "}
						<Link
							onClick={() => {
								localStorage.setItem("bonus", true);
							}}
							to="/"
							className="here"
						>
							Try it Now
						</Link>
						.
						<span className="bonus-rules">
							<img
								src={bonusRules}
								alt=""
							/>
						</span>
					</p>
				</ul>
				<p>
					<b>
						<em>
							Please note that values entered for the room ID are case-sensitive and
							also game-type-sensitive.{" "}
						</em>
					</b>
					For instance, entering these two '<b>4oVxC2k</b>' and '<b>4oVxC2K</b>', will not
					match against each other, rather both will be in different rooms. Also, two
					players cannot play against each other when one player is in a{" "}
					<b>bonus-play mode</b> and another is in a <b>normal-play mode.</b>{" "}
				</p>
				<div className="buttons">
					<div
						onClick={() => setGameMode("normal")}
						className={`${gameMode === "normal" ? "active" : ""}`}
					>
						Normal
					</div>
					<div
						onClick={() => setGameMode("bonus")}
						className={`${gameMode === "bonus" ? "active" : ""}`}
					>
						Bonus
					</div>
				</div>{" "}
				{gameMode === "bonus" ? (
					<img
						src={demo4Normal}
						alt=""
						className="outcomes"
					/>
				) : (
					<img
						src={demo4Bonus}
						alt=""
						className="outcomes"
					/>
				)}
			</section>

			<section ref={liveChatRef}>
				<div className="feature-header">
					<h1>Live Chat</h1>
				</div>
				<p>
					A live-chat app has also been added to the game, which allows you to chat with
					your opponent live during the game. To use this feature, open the{" "}
					<b>Menu bar</b> and click on <b>Live Chat</b> to start a conversation.
				</p>
				<img
					src={demo5}
					alt="Using live chat feature"
					className="outcomes"
				/>
				<p>
					<b>Note: </b>This feature is only available in Dual-player mode.
				</p>
			</section>

			<div className="buttons">
				<button
					className="next-btn"
					onClick={() => {
						setPage("introduction");
						setFeature("overview");
					}}
				>
					<img src={arrowBack} />
					Previous
				</button>

				{userExists && (
					<button
						className="next-btn"
						onClick={() => {
							setPage("contact");
						}}
					>
						Next
						<img src={arrowForward} />
					</button>
				)}
			</div>
		</>
	);
};

export default Other;
