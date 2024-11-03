import { Link } from "react-router-dom";
import useContextProvider from "../hooks/useContextProvider";
import useFunctions from "../hooks/useFunctions";
import chatIcon from "../images/chatbubbles-outline.svg";
import normalIcon from "../images/cube-outline.svg";
import bonusIcon from "../images/gift-outline.svg";
import helpIcon from "../images/help-circle-outline.svg";
import closeIcon from "../images/icon-close nav.svg";
import dualIcon from "../images/people-outline.svg";
import profile from "../images/person-circle-outline.svg";
import singleIcon from "../images/person-outline.svg";
import shuffleIcon from "../images/shuffle-outline.svg";
import statsIcon from "../images/stats-chart-outline.svg";
import lockIcon from "../images/swap-horizontal-outline.svg";

const Footer = ({
	user,
	setSidebarIsShowing,
	chatIsShowing,
	setChatIsShowing,
	setShowDualPlayerStats,
	setShowChangeModePopup,
}) => {
	const {
		isOnePlayer,
		socket,
		setRoomIsSelected,
		setRoomID,
		setIsOnePlayer,
		setPlayerIsChosen,
		bonusState,
		setBonusState,
	} = useContextProvider();
	const { leaveRoom, logout } = useFunctions();

	return (
		<footer className="footer-sidebar">
			{user?.username ? (
				<>
					<h1>Menu</h1>
					<br />
					<div
						className="sidebar-link"
						onClick={() => setSidebarIsShowing(false)}
					>
						<img
							src={closeIcon}
							alt="close-icon"
							className="close-icon"
						/>
					</div>

					{isOnePlayer && (
						<Link
							to="/leaderboard"
							className="link"
							title="Go to Leaderboard"
						>
							<img
								src={statsIcon}
								alt="messages"
								title="Leaderboard"
							/>
							Leaderboard
						</Link>
					)}

					{!isOnePlayer && (
						<Link
							to="/"
							className="link"
							onClick={() => setShowDualPlayerStats(true)}
						>
							<img
								src={statsIcon}
								alt="View Game Stats Icon"
								title="Game Stats"
							/>
							View Game Stats
						</Link>
					)}

					{!isOnePlayer && (
						<Link
							to="/"
							className="link"
							onClick={() => {
								setChatIsShowing(!chatIsShowing);
								setSidebarIsShowing(false);
							}}
						>
							<img
								src={chatIcon}
								alt="messages"
								title="Leaderboard"
							/>
							Live Chat
						</Link>
					)}

					<>
						{!isOnePlayer && (
							<div
								onClick={() => {
									setShowChangeModePopup(true);
								}}
								className="link"
								title="Play against computer."
							>
								<img
									src={singleIcon}
									alt="messages"
									title="Leaderboard"
								/>
								Play Single
							</div>
						)}

						{isOnePlayer && (
							<Link
								to="/select-room"
								className="link"
								onClick={() => {
									setIsOnePlayer(false);
									setPlayerIsChosen(true);
									setSidebarIsShowing(false);
								}}
								title="Play against a friend"
							>
								<img
									src={dualIcon}
									alt="messages"
									title="Leaderboard"
								/>
								Play Dual
							</Link>
						)}
					</>

					<>
						{bonusState && isOnePlayer && (
							<Link
								to="/"
								onClick={() => {
									localStorage.setItem("bonus", JSON.stringify(false));
									setBonusState("setting");
									setTimeout(() => {
										setBonusState(false);
									}, 2000);
									setSidebarIsShowing(false);
								}}
								className="link"
							>
								<img
									src={normalIcon}
									alt="messages"
									title="Leaderboard"
								/>
								Normal
							</Link>
						)}

						{!bonusState && isOnePlayer && (
							<Link
								to="/"
								className="link"
								onClick={() => {
									localStorage.setItem("bonus", JSON.stringify(true));
									setBonusState("setting");
									setTimeout(() => {
										setBonusState(true);
									}, 2000);
									setSidebarIsShowing(false);
								}}
							>
								<img
									src={bonusIcon}
									alt="messages"
									title="Leaderboard"
								/>
								Bonus
							</Link>
						)}
					</>

					<Link
						to={`/p/${user?.username}`}
						className="link"
						title="View your profile"
					>
						<img
							src={profile}
							alt="profile"
						/>
						My Profile
					</Link>

					<Link
						to="/help"
						className="link"
						title="Get help"
					>
						<img
							src={helpIcon}
							alt="profile"
						/>
						Help
					</Link>

					{!isOnePlayer ? (
						<button
							className="Btn logout-btn"
							onClick={() => {
								leaveRoom(socket);
								setRoomID(null);
								setRoomIsSelected(false);
							}}
						>
							<div className="sign">
								<svg viewBox="0 0 512 512">
									<path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
								</svg>
							</div>

							<div className="text">Leave</div>
						</button>
					) : (
						<button
							className="Btn logout-btn"
							onClick={logout}
						>
							<div className="sign">
								<svg viewBox="0 0 512 512">
									<path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
								</svg>
							</div>

							<div className="text">Logout</div>
						</button>
					)}
				</>
			) : (
				<>
					<h1>Welcome</h1>
					<br />
					<div
						className="sidebar-link"
						onClick={() => setSidebarIsShowing(false)}
					>
						<img
							src={closeIcon}
							alt="close-icon"
							className="close-icon"
						/>
					</div>

					<Link
						to="/login"
						className="link"
					>
						<img
							src={lockIcon}
							alt="messages"
							title="Leaderboard"
						/>
						Login
					</Link>

					<Link
						to="/signup"
						className="link"
					>
						<img
							src={shuffleIcon}
							alt="messages"
							title="Leaderboard"
						/>
						Signup
					</Link>

					<Link
						to="/help"
						className="link"
						title="Get help"
					>
						<img
							src={helpIcon}
							alt="profile"
						/>
						Help
					</Link>
				</>
			)}
		</footer>
	);
};

export default Footer;
