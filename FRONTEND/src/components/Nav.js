import React, { useEffect, useState } from "react";
import useCheckContext from "../hooks/useCheckContext";

const Nav = ({ setSidebarIsShowing }) => {
	const { roomID, socket, setLeftRoom } = useCheckContext();
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
				onClick={() => {
					setNavIsShowing(!navIsShowing);
					setSidebarIsShowing(true);
				}}
			>
				<span className="bars"></span>
				<span className="bars"></span>
				<span className="bars"></span>
			</div>
		</nav>
	);
};

export default Nav;
