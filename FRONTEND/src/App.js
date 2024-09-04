import "./App.css";

import { createContext, useEffect, useState } from "react";
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
import GameType from "./pages/GameType";
import Profile from "./pages/Profile";
import PlayerProfile from "./pages/PlayerProfile";

export const GameContext = createContext();
function App() {
	const { playerIsChosen, roomIsSelected, userExists, setUserExists, scores } = useCheckContext();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));

		if (user) {
			setUserExists(true);
		} else {
			setUserExists(false);
		}
	}, []);

	const user = JSON.parse(localStorage.getItem("user"));

	const [renderUnknown, setRenderUnknown] = useState(false);

	useEffect(() => {
		setRenderUnknown(false);

		setTimeout(() => {
			setRenderUnknown(true);
		}, 2000);
	}, []);

	return (
		<>
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
						element={<PlayerSelection />}
					/>

					<Route
						path="/select-room"
						element={<Room />}
					/>

					<Route
						path="/select-game-type"
						element={<GameType />}
					/>

					<Route
						path="/leaderboard"
						element={userExists ? <Leaderboard /> : <Navigate to="/login" />}
					/>

					<Route
						path={`/profile`}
						element={userExists ? <Profile /> : <Navigate to="/login" />}
					/>

					<Route
						path={`/p/${user.username}`}
						element={userExists ? <Profile /> : <Navigate to="/login" />}
					/>

					{scores?.map((score) => (
						<Route
							path={`/p/${score?.username}`}
							element={userExists ? <PlayerProfile /> : <Navigate to="/login" />}
						/>
					))}

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
							renderUnknown && (
								<div style={{ color: "white", textAlign: "center" }}>
									<h1>Page not found</h1>
									<Link
										to="/select-player"
										style={{ color: "white" }}
									>
										Select Game Mode
									</Link>
								</div>
							)
						}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
