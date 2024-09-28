import "./styles/Animation.css";
import "./styles/Home.css";
import "./styles/Leaderboard.css";
import "./styles/Profile.css";
import "./styles/Help.css";
import "./styles/Mobile.css";
import "./styles/Chat.css";
import "./styles/Sidebar.css";
import "./styles/Room.css";
import { createContext, useEffect, useState } from "react";
import useCheckContext from "./hooks/useCheckContext";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlayerSelection from "./pages/PlayerSelection";
import Room from "./pages/Room";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Audios from "./components/Audios";
import Profile from "./pages/Profile";
import PlayerProfile from "./pages/PlayerProfile";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";
import Logo from "./components/Logo";
import Help from "./pages/Help";
import Axios from "axios";
import ErrorOccurred from "./components/ErrorOccurred";
import Contact from "./pages/Contact";
import AvailableRooms from "./components/AvailableRooms";
import EditProfile from "./pages/EditProfile";

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

		const timer = setTimeout(() => {
			setIsRendered(true);
		}, 2000);

		return () => clearTimeout(timer);
	}, [location.pathname]);

	return isRendered ? (
		children
	) : (
		<>
			<Logo />
			<Loader />
		</>
	);
}

function LoadingApp({ isAppRendered, setIsAppRendered, children }) {
	const location = useLocation();

	useEffect(() => {
		setIsAppRendered(false);

		const timer = setTimeout(() => {
			setIsAppRendered(true);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return isAppRendered ? (
		children
	) : (
		<>
			<Logo />
			<Loader />
		</>
	);
}

function App() {
	const {
		playerIsChosen,
		roomIsSelected,
		userExists,
		setUserExists,
		isOnePlayer,
		user,
		authorize,
	} = useCheckContext();
	const [isRendered, setIsRendered] = useState(false);
	const [isAppRendered, setIsAppRendered] = useState(false);

	/**
	 	All todo:
		Create an invite template that users can share in two player mode(maybe also in single player)
		Create Invite a friend button
	 * 	- Interactive Tutorials: Create a tutorial mode to help new players learn the game.
	 * 	- Statistics Tracking: Provide detailed stats, such as win/loss ratio, most picked moves, streaks(wins, losses, ties), etc.
	 * 	- todo: Remove chat popup when an empty space is clicked <------ Next todo:
	 		- Create feature where players are allowed to play the game even when they are not logged in, and remind them that scores will not be saved 
				- Will be lost when page is refreshed
				- Cant view profile, leaderboard
				- Cant play bonus or dual mode
	 */

	/**fixme: refactor CSS */

	const [isServerOk, setIsServerOk] = useState(true);
	const startServer = async () => {
		try {
			const res = await Axios.get(
				`https://rock-paper-scissors-app-iybf.onrender.com/api/user/${user?.username}`,
				// `http://localhost:4001/api/user/${user?.username}`,
				{
					headers: { Authorization: `Bearer ${user.token}` },
				}
			);

			if (res.data) setIsServerOk(true);
		} catch (error) {
			setIsServerOk(false);
			console.log(error);
			alert("Error Occurred. Check the console to see what occurred.");
		}
	};
	useEffect(() => {
		// startServer();
		authorize();
	}, []);

	return (
		<>
			{/* {errorOccurred && <ErrorOccurred />} */}
			<LoadingApp
				isAppRendered={isAppRendered}
				setIsAppRendered={setIsAppRendered}
			>
				<Audios />
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute userExists={userExists}>
								{playerIsChosen ? (
									roomIsSelected ? (
										<>
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
								<Loading
									isRendered={isRendered}
									setIsRendered={setIsRendered}
								>
									<PlayerSelection />
								</Loading>
							</PrivateRoute>
						}
					/>

					{!isOnePlayer && (
						<Route
							path="/select-room"
							element={
								<PrivateRoute userExists={userExists}>
									<Logo />

									<Room />
								</PrivateRoute>
							}
						/>
					)}

					{!isOnePlayer && (
						<Route
							path="/available-rooms"
							element={
								<PrivateRoute userExists={userExists}>
									<Logo />

									<AvailableRooms />
								</PrivateRoute>
							}
						/>
					)}

					{isOnePlayer && (
						<Route
							path="/leaderboard"
							element={
								<PrivateRoute userExists={userExists}>
									<Loading
										isRendered={isRendered}
										setIsRendered={setIsRendered}
									>
										<Leaderboard />
									</Loading>
								</PrivateRoute>
							}
						/>
					)}

					<Route
						path={"/help"}
						element={
							<PrivateRoute userExists={userExists}>
								<Loading
									isRendered={isRendered}
									setIsRendered={setIsRendered}
								>
									<Help />
								</Loading>
							</PrivateRoute>
						}
					/>

					<Route
						path={"/help/contact"}
						element={
							<PrivateRoute userExists={userExists}>
								<Loading
									isRendered={isRendered}
									setIsRendered={setIsRendered}
								>
									<Contact />
								</Loading>
							</PrivateRoute>
						}
					/>

					<Route
						path={`/p/${user?.username}`}
						element={
							<PrivateRoute userExists={userExists}>
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
						path={`/edit/profile`}
						element={
							<PrivateRoute userExists={userExists}>
								<Loading
									isRendered={isRendered}
									setIsRendered={setIsRendered}
								>
									<EditProfile />
								</Loading>
							</PrivateRoute>
						}
					/>

					{isOnePlayer && (
						<Route
							path="/p/:username"
							element={
								<PrivateRoute userExists={userExists}>
									<Loading
										isRendered={isRendered}
										setIsRendered={setIsRendered}
									>
										<PlayerProfile />
									</Loading>
								</PrivateRoute>
							}
						/>
					)}

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
			</LoadingApp>
		</>
	);
}

export default App;
