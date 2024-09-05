import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	const [renderUnknownRoutes, setRenderUnknownRoutes] = useState(false);

	useEffect(() => {
		setRenderUnknownRoutes(false);
		const timer = setTimeout(() => {
			setRenderUnknownRoutes(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	return (
		renderUnknownRoutes && (
			<div style={{ color: "white", textAlign: "center" }}>
				<h1>Page not found</h1>
				<Link
					to="/select-player-mode"
					style={{ color: "white" }}
				>
					Select Player Mode
				</Link>
			</div>
		)
	);
};

export default NotFound;
