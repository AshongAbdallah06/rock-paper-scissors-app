import "./App.css";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./GameBoard";
import { createContext, useState } from "react";
import Dialog from "./components/Dialog";
import useCheckContext from "./hooks/useCheckContext";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useGetHome from "./hooks/useGetHome";
import Chat from "./components/Chat";
import PlayerSelection from "./pages/PlayerSelection";

export const GameContext = createContext();
function App() {
	const { userExist, gameState, playerIsChosen, setPlayerIsChosen } = useCheckContext();

	// const { getHome } = useGetHome();

	// useEffect(() => {
	// 	getHome();
	// }, []);

	const [chatIsShowing, setChatIsShowing] = useState(false);

	return (
		<div>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							playerIsChosen ? (
								<>
									<ScoreBoard
										setChatIsShowing={setChatIsShowing}
										chatIsShowing={chatIsShowing}
									/>
									<GameBoard />
									<Dialog />

									{chatIsShowing ? (
										<Chat setChatIsShowing={setChatIsShowing} />
									) : (
										""
									)}
								</>
							) : (
								<Navigate to="/select-player" />
							)
						}
					/>

					<Route
						path="/select-player"
						element={!playerIsChosen ? <PlayerSelection /> : <Navigate to="/" />}
					/>

					<Route
						path="/login"
						element={<Login />}
					/>

					<Route
						path={"/signup"}
						element={<Signup />}
					/>

					<Route
						path="*"
						element={
							<div style={{ color: "white", textAlign: "center" }}>
								<h1>Page not found</h1>
								<Link
									to="/select-player"
									style={{ color: "white" }}
								>
									Select Game Mode
								</Link>
							</div>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
