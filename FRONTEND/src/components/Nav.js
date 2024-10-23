import React, { FC, useEffect, useState } from "react";
import useContextProvider from "../hooks/useContextProvider";
import menuBar from "../images/menu-outline.svg";

const Nav = ({ setSidebarIsShowing }) => {
	const { roomID, socket, setLeftRoom, leftRoom } = useContextProvider();
	const [navIsShowing, setNavIsShowing] = useState(false);

	useEffect(() => {
		socket.on("leave-room", ({ msg }) => {
			setLeftRoom(msg);

			setTimeout(() => {
				setLeftRoom("");
			}, 2000);
		});
	}, [roomID, socket, leftRoom]);

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
