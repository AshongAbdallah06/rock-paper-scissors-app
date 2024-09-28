import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CheckContextProvider from "./context/CheckContextProvider";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<CheckContextProvider>
				<App />
			</CheckContextProvider>
		</Router>
	</React.StrictMode>
);
