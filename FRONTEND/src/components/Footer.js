import React, { useState } from "react";
import useCheckContext from "../hooks/useCheckContext";
import copyIcon from "../images/copy-regular.svg";
import { Link } from "react-router-dom";
import profile from "../images/person-circle-outline.svg";
import closeIcon from "../images/icon-close nav.svg";
import statsIcon from "../images/stats-chart-outline.svg";
import appsIcon from "../images/apps-outline.svg";
import modeIcon from "../images/game-controller-outline.svg";
import rulesIcon from "../images/book-outline.svg";
import chatIcon from "../images/chatbubbles-outline.svg";
import singleIcon from "../images/person-outline.svg";
import dualIcon from "../images/people-outline.svg";
import normalIcon from "../images/cube-outline.svg";
import bonusIcon from "../images/gift-outline.svg";
import useFunctions from "../hooks/useFunctions";

const Footer = ({
	setShowCopiedAlert,
	user,
	setSidebarIsShowing,
	chatIsShowing,
	setChatIsShowing,
	bonusState,
	setBonusState,
}) => {
	const {
		roomID,
		isOnePlayer,
		setIsRulesModalShow,
		socket,
		setLeftRoom,
		setRoomIsSelected,
		setRoomID,
		setIsOnePlayer,
		setPlayerIsChosen,
	} = useCheckContext();
	const { leaveRoom, logout } = useFunctions();

	const showModal = () => {
		setIsRulesModalShow(true);
	};

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

	const [changeMode, setChangeMode] = useState(false);
	const [changeGameType, setChangeGameType] = useState(false);
	return (
		<footer className="footer-sidebar">
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
					className="link"
					onClick={copyRoomID}
				>
					<img
						src={copyIcon}
						alt="copyIcon"
						className="copy-icon"
						title="copy"
					/>
					Room ID: {roomID}
				</Link>
			)}

			<Link
				className="link"
				onClick={showModal}
			>
				<img
					src={rulesIcon}
					alt="messages"
					title="Leaderboard"
				/>
				Rules
			</Link>

			{!isOnePlayer && (
				<Link
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

			<Link
				className="link"
				onClick={() => {
					setChangeMode(!changeMode);
				}}
			>
				<img
					src={modeIcon}
					alt="messages"
					title="Leaderboard"
				/>
				Change Mode
			</Link>

			{changeMode && (
				<>
					{!isOnePlayer && (
						<div
							onClick={() => {
								setIsOnePlayer(true);
								setPlayerIsChosen(true);
								setRoomIsSelected(true);
								setSidebarIsShowing(false);

								window.location.reload();
							}}
							className="link sub-link"
						>
							<img
								src={singleIcon}
								alt="messages"
								title="Leaderboard"
							/>
							Single
						</div>
					)}

					{isOnePlayer && (
						<Link
							to="/select-room"
							className="link sub-link"
							onClick={() => {
								setIsOnePlayer(false);
								setPlayerIsChosen(true);
								setSidebarIsShowing(false);
							}}
						>
							<img
								src={dualIcon}
								alt="messages"
								title="Leaderboard"
							/>
							Dual
						</Link>
					)}
				</>
			)}

			<Link
				className="link"
				onClick={() => {
					setChangeGameType(!changeGameType);
				}}
			>
				<img
					src={appsIcon}
					alt="messages"
					title="Leaderboard"
				/>
				Select Game Type
			</Link>

			{changeGameType && (
				<>
					{bonusState && (
						<Link
							onClick={() => {
								localStorage.setItem("bonus", JSON.stringify(false));
								setBonusState("setting");
								setTimeout(() => {
									setBonusState(JSON.parse(localStorage.getItem("bonus")));
								}, 2000);
								setSidebarIsShowing(false);
							}}
							className="link sub-link"
						>
							<img
								src={normalIcon}
								alt="messages"
								title="Leaderboard"
							/>
							Normal
						</Link>
					)}

					{!bonusState && (
						<Link
							className="link sub-link"
							onClick={() => {
								localStorage.setItem("bonus", JSON.stringify(true));
								setBonusState("setting");
								setTimeout(() => {
									setBonusState(JSON.parse(localStorage.getItem("bonus")));
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
			)}

			<Link
				to={`/p/${user?.username}`}
				className="link"
			>
				<img
					src={profile}
					alt="profile"
				/>
				My Profile
			</Link>

			{!isOnePlayer ? (
				<button
					className="Btn logout-btn"
					onClick={() => {
						leaveRoom(socket, setLeftRoom);
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
		</footer>
	);
};

export default Footer;
