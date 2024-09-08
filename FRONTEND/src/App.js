import "./App.css";
import { createContext, useEffect, useState } from "react";
import useCheckContext from "./hooks/useCheckContext";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlayerSelection from "./pages/PlayerSelection";
import Room from "./pages/Room";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Audios from "./components/Audios";
import GameType from "./pages/GameType";
import Profile from "./pages/Profile";
import PlayerProfile from "./pages/PlayerProfile";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";
import Logo from "./components/Logo";

export const GameContext = createContext();

function PrivateRoute({ userExists, children }) {
	return userExists ? children : <Navigate to="/login" />;
}

function PublicRoute({ userExists, children }) {
	return userExists ? <Navigate to="/" /> : children;
}

function Loading({ isRendered, setIsRendered, children }) {
	const location = useLocation();

	useEffect(() => {
		setIsRendered(false);
		// console.log(window.location.pathname);

		const timer = setTimeout(() => {
			setIsRendered(true);
		}, 2000);

		return () => clearTimeout(timer);
	}, [location.pathname]);

	return isRendered ? children : <Loader />;
}

function App() {
	const { playerIsChosen, roomIsSelected, userExists, setUserExists } = useCheckContext();
	const [isRendered, setIsRendered] = useState(false);

	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		setUserExists(!!user);
	}, [setUserExists, user]);

	return (
		<>
			<Audios />
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute userExists={userExists}>
								{playerIsChosen ? (
									roomIsSelected ? (
										<>
											{!isRendered && <Logo />}
											<Loading
												isRendered={isRendered}
												setIsRendered={setIsRendered}
											>
												<Home />
											</Loading>
										</>
									) : (
										<Navigate to="/select-room" />
									)
								) : (
									<Navigate to="/select-player-mode" />
								)}
							</PrivateRoute>
						}
					/>

					<Route
						path="/select-player-mode"
						element={
							<PrivateRoute userExists={userExists}>
								{!isRendered && <Logo />}

								<Loading
									isRendered={isRendered}
									setIsRendered={setIsRendered}
								>
									<PlayerSelection />
								</Loading>
							</PrivateRoute>
						}
					/>

					<Route
						path="/select-room"
						element={
							<PrivateRoute userExists={userExists}>
								<Room />
							</PrivateRoute>
						}
					/>

					<Route
						path="/select-game-type"
						element={
							<PrivateRoute userExists={userExists}>
								{!isRendered && <Logo />}

								<Loading
									isRendered={isRendered}
									setIsRendered={setIsRendered}
								>
									<GameType />
								</Loading>
							</PrivateRoute>
						}
					/>

					<Route
						path="/leaderboard"
						element={
							<PrivateRoute userExists={userExists}>
								{!isRendered && <Logo />}

								<Loading
									isRendered={isRendered}
									setIsRendered={setIsRendered}
								>
									<Leaderboard />
								</Loading>
							</PrivateRoute>
						}
					/>

					<Route
						path={`/p/${user?.username}`}
						element={
							<PrivateRoute userExists={userExists}>
								{!isRendered && <Logo />}

								<Loading
									isRendered={isRendered}
									setIsRendered={setIsRendered}
								>
									<Profile />
								</Loading>
							</PrivateRoute>
						}
					/>

					<Route
						path="/p/:username"
						element={
							<PrivateRoute userExists={userExists}>
								{!isRendered && <Logo />}

								<Loading
									isRendered={isRendered}
									setIsRendered={setIsRendered}
								>
									<PlayerProfile />
								</Loading>
							</PrivateRoute>
						}
					/>

					<Route
						path="/login"
						element={
							<PublicRoute userExists={userExists}>
								<Login />
							</PublicRoute>
						}
					/>

					<Route
						path="/signup"
						element={
							<PublicRoute userExists={userExists}>
								<Signup />
							</PublicRoute>
						}
					/>

					<Route
						path="*"
						element={
							<Loading
								isRendered={isRendered}
								setIsRendered={setIsRendered}
							>
								<NotFound />
							</Loading>
						}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
