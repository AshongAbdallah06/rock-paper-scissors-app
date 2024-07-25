import "./App.css";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./GameBoard";
import { createContext } from "react";
import Dialog from "./components/Dialog";

export const GameContext = createContext();
function App() {
	return (
		<div>
			<>
				<ScoreBoard />
				<GameBoard />
				<Dialog />
			</>
		</div>
	);
}

export default App;
