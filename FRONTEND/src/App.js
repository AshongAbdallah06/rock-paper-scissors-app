import React from "react";
import "./App.css";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./GameBoard";

function App() {
	return (
		<div>
			<ScoreBoard />

			<GameBoard />

			<button className="rules">RULES</button>
		</div>
	);
}

export default App;
