import React from "react";
import rockWin from "../../images/outcomes/rock-win.png";
import paperWin from "../../images/outcomes/paper-win.png";
import scissorsWin from "../../images/outcomes/scissors-win.png";
import video from "../../images/outcomes/Media1.mp4";
import arrowForward from "../../images/arrow-forward-outline.svg";

const Introduction = ({ setPage }) => {
	return (
		<>
			<section>
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

			<section>
				<h2>Rules</h2>
				<p>
					In every round, your objective is to select the hand sign that beats your
					opponent's. Whether you play against a friend, a stranger online, or a computer,
					every game comes down to timing, strategy, and a little bit of luck.
				</p>

				<div className="outcome-images">
					<div>
						<img
							src={rockWin}
							alt="outcomes"
							className="outcomes"
						/>
						<span>Rock beats Scissors</span>
					</div>

					<div>
						<img
							src={paperWin}
							alt="outcomes"
							className="outcomes"
						/>
						<span>Paper beats Rock</span>
					</div>

					<div>
						<img
							src={scissorsWin}
							alt="outcomes"
							className="outcomes"
						/>
						<span>Scissors beats Paper</span>
					</div>
				</div>
			</section>

			<section>
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
					{/* <li>The winner of the round is determined based on the rules.</li> */}
					{/* Play continues until one player wins enough rounds to be declared the victor. */}
				</ul>

				<p>Try to win as many rounds as possible to improve your stats and ranking.</p>

				<video
					src={video}
					className="outcomes"
					controls={true}
					autoPlay={true}
				/>
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
