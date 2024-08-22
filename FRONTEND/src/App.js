import "./App.css";

import { createContext, useEffect } from "react";
import useCheckContext from "./hooks/useCheckContext";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlayerSelection from "./pages/PlayerSelection";
import Room from "./pages/Room";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Axios from "axios";
import Audios from "./components/Audios";

export const GameContext = createContext();
function App() {
	const { playerIsChosen, roomIsSelected, userExists, setUserExists } = useCheckContext();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));

		if (user) {
			setUserExists(true);
		} else {
			setUserExists(false);
		}
	}, []);

	return (
		<div>
			<Audios />
			<Router>
				<Routes>
					{/* {userExists } */}
					<Route
						path="/"
						element={
							userExists ? (
								playerIsChosen && roomIsSelected ? (
									<Home />
								) : !playerIsChosen ? (
									<PlayerSelection />
								) : (
									!roomIsSelected && <Room />
								)
							) : (
								<Navigate to="/login" />
							)
						}
					/>

					<Route
						path="/select-player"
						element={
							userExists ? (
								!playerIsChosen ? (
									<PlayerSelection />
								) : (
									<Navigate to="/" />
								)
							) : (
								<Navigate to="/login" />
							)
						}
					/>

					<Route
						path="/select-room"
						element={
							userExists ? (
								!roomIsSelected ? (
									!playerIsChosen ? (
										<Room />
									) : (
										<Navigate to="/select-player" />
									)
								) : (
									<Navigate to="/" />
								)
							) : (
								<Navigate to="/login" />
							)
						}
					/>

					<Route
						path="/leaderboard"
						element={userExists ? <Leaderboard /> : <Navigate to="/login" />}
					/>

					<Route
						path="/login"
						element={!userExists ? <Login /> : <Navigate to="/" />}
					/>

					<Route
						path={"/signup"}
						element={!userExists ? <Signup /> : <Navigate to="/" />}
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
