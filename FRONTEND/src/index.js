import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CheckContextProvider from "./context/CheckContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<CheckContextProvider>
			<App />
		</CheckContextProvider>
	</React.StrictMode>
);
