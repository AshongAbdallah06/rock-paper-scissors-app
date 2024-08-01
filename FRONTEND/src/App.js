import "./App.css";

import { createContext } from "react";
import useCheckContext from "./hooks/useCheckContext";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlayerSelection from "./pages/PlayerSelection";
import Room from "./pages/Room";
import Home from "./pages/Home";

export const GameContext = createContext();
function App() {
	const { playerIsChosen, roomIsSelected } = useCheckContext();

	return (
		<div>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							playerIsChosen && roomIsSelected ? (
								<Home />
							) : !playerIsChosen ? (
								<PlayerSelection />
							) : (
								!roomIsSelected && <Room />
							)
						}
					/>

					<Route
						path="/select-player"
						element={!playerIsChosen ? <PlayerSelection /> : <Navigate to="/" />}
					/>

					<Route
						path="/select-room"
						element={
							!roomIsSelected ? (
								!playerIsChosen ? (
									<Room />
								) : (
									<Navigate to="/select-player" />
								)
							) : (
								<Navigate to="/" />
							)
						}
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
