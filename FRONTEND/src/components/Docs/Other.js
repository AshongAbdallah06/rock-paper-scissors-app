import React from "react";
import video from "../../images/outcomes/Leaderboard.mp4";
import arrowBack from "../../images/arrow-back-outline.svg";
import bonusRules from "../../images/image-rules-bonus.svg";
import viewProfileVideo from "../../images/outcomes/view-profile.mp4";
import { Link } from "react-router-dom";

const Other = ({ page, setPage, docsContentRef }) => {
	return (
		<>
			<section ref={docsContentRef}>
				<h2>View Live Leaderboard</h2>
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
					controls={true}
					autoPlay={true}
				/>
			</section>

			<section>
				<h2>View Your Profile</h2>
				<p>
					Your profile page is where you get detailed information about your game-play.
					There are more things to discover on this page. It provides you with detailed
					stats, such as win/loss ratio, most picked moves, streaks(wins, losses, ties),
					and many more.
				</p>
				<p>
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
				</p>
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

				<video
					src={viewProfileVideo}
					className="outcomes"
					controls={true}
					autoPlay={true}
				/>
			</section>

			<section>
				<h2>Game & Player Modes</h2>
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
							onClick={() => {
								localStorage.setItem("player-mode", JSON.stringify("single"));
								localStorage.removeItem("usernames");
								window.location.href = "/";
							}}
							to="/"
							className="here"
						>
							{" "}
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
						for single player also apply here.{" "}
						<Link
							onClick={() => {
								localStorage.setItem("player-mode", JSON.stringify("dual"));
								window.location.href = "/";
							}}
							to="/"
							className="here"
						>
							Play Now
						</Link>
						.
					</p>

					<li>
						<b>Game Modes</b>
					</li>
					<p>
						<b>Normal</b>: In this mode, you are challenged by a smart computer who
						tries to counter your moves wisely. Click
						<Link
							to="/help?page=introduction"
							className="here"
							onClick={() => setPage("introduction")}
						>
							{" "}
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
						<div className="bonus-rules">
							<img
								src={bonusRules}
								alt=""
							/>
						</div>
					</p>
				</ul>
			</section>

			<div className="buttons">
				<button
					className="next-btn"
					onClick={() => setPage("introduction")}
				>
					<img src={arrowBack} />
					Previous
				</button>

				<button
					className="next-btn"
					onClick={() => setPage("features")}
					disabled
				>
					Next
				</button>
			</div>
		</>
	);
};

export default Other;
