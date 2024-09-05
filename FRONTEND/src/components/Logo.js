import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

const Logo = () => {
	return (
		<Link
			to="/"
			className="header"
		>
			<img
				src={logo}
				alt="logo"
			/>
		</Link>
	);
};

export default Logo;
