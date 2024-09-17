import React from "react";
import { Link } from "react-router-dom";

const Unresponsive = () => {
	return (
		<div className="unresponsive">
			<h1>Server Unresponsive. Please try again later</h1>
			<p>Sorry for the inconvenience</p>.
			<span onClick={() => (window.location.href = "/contact")}>Contact Us</span>
		</div>
	);
};

export default Unresponsive;
