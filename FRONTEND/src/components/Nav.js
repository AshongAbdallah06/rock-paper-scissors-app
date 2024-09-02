import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import closeIcon from "../images/icon-close nav.svg";
import useCheckContext from "../hooks/useCheckContext";
import useFunctions from "../hooks/useFunctions";

const Nav = () => {
	const { roomID, setRoomID, setRoomIsSelected, socket, setLeftRoom, isOnePlayer } =
		useCheckContext();
	const { leaveRoom } = useFunctions();
	const [navIsShowing, setNavIsShowing] = useState(false);

	useEffect(() => {
		socket.on("leaveRoom", ({ msg }) => {
			setLeftRoom(msg);
		});
	}, [roomID]);

	return (
		<nav className="nav">
			<div
				className="menu-bar"
				onClick={() => setNavIsShowing(!navIsShowing)}
			>
				<span className="bars"></span>
				<span className="bars"></span>
				<span className="bars"></span>
			</div>

			{navIsShowing && (
				<div className="nav-links">
					<button onClick={() => setNavIsShowing(false)}>
						<img
							src={closeIcon}
							alt="close-icon"
							className="close-icon"
						/>
					</button>

					<Link
						className=""
						onClick={() => {
							localStorage.removeItem("player-mode");
							window.location.href = "/";
						}}
					>
						Change Mode
					</Link>

					<Link
						className=""
						onClick={() => {
							// localStorage.removeItem("player-mode");
							window.location.href = "/select-game-type";
						}}
					>
						Select Game Type
					</Link>

					{!isOnePlayer && (
						<Link
							to="/select-room"
							className="leave"
							onClick={() => {
								leaveRoom(socket, setLeftRoom);
								setRoomID(null);
								setRoomIsSelected(false);
							}}
						>
							Leave Room
						</Link>
					)}
				</div>
			)}
		</nav>
	);
};

export default Nav;
