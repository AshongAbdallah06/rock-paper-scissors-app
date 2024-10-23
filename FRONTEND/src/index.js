import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContextProvider from "./context/ContextProvider";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<Router>
				<ContextProvider>
					<App />
				</ContextProvider>
			</Router>
		</React.StrictMode>
	);
} else {
	console.error("Root element not found");
}
