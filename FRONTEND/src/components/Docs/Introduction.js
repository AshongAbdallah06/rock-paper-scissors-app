import React, { useEffect, useRef, useState } from "react";
import rulesNormal from "../../images/image-rules.svg";
import normalGamePlay from "../../images/outcomes/Media1.mp4";
import bonusGamePlay from "../../images/outcomes/bonus-game-play.mp4";
import arrowForward from "../../images/arrow-forward-outline.svg";
import { useSearchParams } from "react-router-dom";

const Introduction = ({ setPage, setSearchParams, feature }) => {
	const [gameMode, setGameMode] = useState("normal");
	const overviewRef = useRef("overview");
	const rulesRef = useRef(null);
	const howToPlayRef = useRef(null);

	const [anotherParam, setAnotherParam] = useSearchParams();
	useEffect(() => {
		if (feature === "overview") {
			overviewRef.current.scrollIntoView({
				top: 0,
				behavior: "smooth",
			});
			setSearchParams((params) => ({ ...params, feature }));
			setAnotherParam((params) => ({ ...params, feature }));
		} else if (feature === "rules") {
			rulesRef.current.scrollIntoView({
				top: 0,
				behavior: "smooth",
			});
			setSearchParams((params) => ({ ...params, feature }));
		} else if (feature === "how-to-play") {
			howToPlayRef.current.scrollIntoView({
				top: 0,
				behavior: "smooth",
			});
			setSearchParams((params) => ({ ...params, feature }));
		}
	}, [feature]);

	return (
		<>
			<section ref={overviewRef}>
				<h2>Overview</h2>
				<p>
					Welcome to Rock Paper Scissors, a game that tests your strategy and luck! The
					game is simple: you will choose one of these hand signs—Rock, Paper, or
					Scissors(Lizard and Spock in bonus mode)—and your goal is to beat your opponent
					by selecting the sign that defeats theirs.
				</p>
				<p>
					<b>Fun Fact</b>: Rock Paper Scissors is one of the world’s simplest yet most
					strategic games, enjoyed by people of all ages. The core concept is a
					head-to-head battle where each player chooses one of three possible hand signs:
					Rock, Paper, or Scissors. The game's simplicity is balanced by its psychological
					aspect—trying to predict what the opponent will choose next. The rules are
					straightforward:
				</p>
			</section>

			<section ref={rulesRef}>
				<h2>Rules</h2>
				<p>
					In every round, your objective is to select the hand sign that beats your
					opponent's. Whether you play against a friend, a stranger online, or a computer,
					every game comes down to timing, strategy, and a little bit of luck.
				</p>

				<div className="outcome-images">
					<img
						src={rulesNormal}
						alt="Image display of rules for normal game mode"
					/>
				</div>
			</section>

			<section ref={howToPlayRef}>
				<h2>How To Play (Single Player Mode)</h2>
				<p>
					In Single Player Mode, you face off against a computer-controlled opponent.
					Playing against the computer in Rock Paper Scissors is one of the most fun and
					challenging ways to test your skills. The computer doesn't have feelings,
					emotions, or habits—it's cold, calculating, and random. While it may seem like a
					simple task to beat the computer, don’t be fooled—the computer is designed to
					keep you on your toes. You’ll need to employ smart strategies, recognize
					patterns, and try to outthink your digital opponent to succeed.
				</p>

				<ul>
					<b>Each round follows these steps:</b>
					<li>
						<b>Selecting Your Move</b>: Each round, you choose between Rock, Paper, or
						Scissors by clicking the corresponding button on the screen.
					</li>
					<li>
						<b>Opponent’s Move</b>: The computer selects its hand randomly, giving you a
						50/50 chance of winning or losing.
					</li>
					<li>
						<b>Outcome</b>: Once both you and the computer have selected a move, the
						outcome is revealed. You will see either a "Victory!" screen if you win, a
						"Defeat..." screen if you lose, or a "Tie" if you both select the same hand
						sign.
					</li>
				</ul>

				<p>Try to win as many rounds as possible to improve your stats and ranking.</p>

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
				</div>

				{gameMode === "normal" && (
					<video
						src={normalGamePlay}
						className="outcomes"
						controls={false}
						autoPlay={true}
						muted={true}
					/>
				)}

				{gameMode === "bonus" && (
					<video
						src={bonusGamePlay}
						className="outcomes"
						controls={false}
						autoPlay={true}
						muted={true}
					/>
				)}
			</section>

			<div className="buttons">
				<button
					className="next-btn"
					onClick={() => setPage("features")}
					disabled
				>
					Previous
				</button>

				<button
					className="next-btn"
					onClick={() => setPage("features")}
				>
					Next
					<img src={arrowForward} />
				</button>
			</div>
		</>
	);
};

export default Introduction;
