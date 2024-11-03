import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

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
				<Logo />

				<h1>Page not found</h1>
				<Link
					to="/"
					style={{ color: "white", textDecoration: "underline" }}
				>
					Go Home
				</Link>
			</div>
		)
	);
};

export default NotFound;
