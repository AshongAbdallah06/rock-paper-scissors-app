import "./App.css";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./GameBoard";
import { createContext, useEffect } from "react";
import Dialog from "./components/Dialog";
import useCheckContext from "./hooks/useCheckContext";

export const GameContext = createContext();
function App() {
	const { checkOptions, playerMove, computerMove, score } = useCheckContext();

	// Save score to localStorage
	useEffect(() => {
		localStorage.setItem("score", JSON.stringify(score));
	}, [score]);

	useEffect(() => {
		checkOptions();
	}, [playerMove, computerMove]);

	return (
		<div>
			<ScoreBoard />

			<GameBoard />

			<Dialog />
		</div>
	);
}

export default App;
