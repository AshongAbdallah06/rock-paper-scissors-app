import React, { useEffect, useState } from "react";
import useCheckContext from "../hooks/useCheckContext";
import menuBar from "../images/menu-outline.svg";

const Nav = ({ setSidebarIsShowing }) => {
	const { roomID, socket, setLeftRoom } = useCheckContext();
	const [navIsShowing, setNavIsShowing] = useState(false);

	useEffect(() => {
		socket.on("leaveRoom", ({ msg }) => {
			setLeftRoom(msg);
		});
	}, [roomID, socket]);

	return (
		<nav className="nav">
			<div
				className="menu-bar"
				onClick={() => {
					setNavIsShowing(!navIsShowing);
					setSidebarIsShowing(true);
				}}
			>
				<img
					src={menuBar}
					alt="messages"
					title="Menu"
				/>
			</div>
		</nav>
	);
};

export default Nav;
