import { Link } from "react-router-dom";
import React, { useState } from "react";
import closeIcon from "../images/icon-close nav.svg";

const Nav = () => {
	const [navIsShowing, setNavIsShowing] = useState(false);
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
				</div>
			)}
		</nav>
	);
};

export default Nav;
