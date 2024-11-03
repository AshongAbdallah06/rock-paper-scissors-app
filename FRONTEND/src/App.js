import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import Logo from "./components/Logo";
import useContextProvider from "./hooks/useContextProvider";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PlayerProfile from "./pages/PlayerProfile";
import PlayerSelection from "./pages/PlayerSelection";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import Signup from "./pages/Signup";
import "./styles/Animation.css";
import "./styles/Chat.css";
import "./styles/Form.css";
import "./styles/Help.css";
import "./styles/Home.css";
import "./styles/Leaderboard.css";
import "./styles/Mobile.css";
import "./styles/Profile.css";
import "./styles/Room.css";
import "./styles/Sidebar.css";

function PrivateRoute({ userExists, children }) {
	return userExists ? <>{children}</> : <Navigate to="/" />;
}

function PublicRoute({ userExists, children }) {
	return userExists ? <Navigate to="/" /> : <>{children}</>;
}

const Loading = ({ isRendered, setIsRendered, children }) => {
	const location = useLocation();

	useEffect(() => {
		setIsRendered(false);

		const timer = setTimeout(() => {
			setIsRendered(true);
		}, 2000);

		return () => clearTimeout(timer);
	}, [location.pathname]);

	return isRendered ? (
		<>{children}</>
	) : (
		<>
			<Logo />
			<Loader />
		</>
	);
};

const LoadingApp = ({ isAppRendered, setIsAppRendered, children }) => {
	useEffect(() => {
		setIsAppRendered(false);

		const timer = setTimeout(() => {
			setIsAppRendered(true);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return isAppRendered ? (
		<>{children}</>
	) : (
		<>
			<Logo />
			<Loader />
		</>
	);
};

const App = () => {
	const { userExists, isOnePlayer, user, authorize } = useContextProvider();
	const [isRendered, setIsRendered] = useState(false);
	const [isAppRendered, setIsAppRendered] = useState(false);

	useEffect(() => {
		authorize();
	}, []);

	return (
		<>
			<LoadingApp
				isAppRendered={isAppRendered}
				setIsAppRendered={setIsAppRendered}
			>
				<Routes>
					<Route
						path="/"
						element={
							<Loading
								isRendered={isRendered}
								setIsRendered={setIsRendered}
							>
								<Home />
							</Loading>
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

					<Route
						path="/select-room"
						element={
							<PrivateRoute userExists={userExists}>
								<Logo />

								{!isOnePlayer ? <Room /> : <Navigate to="/" />}
							</PrivateRoute>
						}
					/>

					<Route
						path="/leaderboard"
						element={
							<PrivateRoute userExists={userExists}>
								<Loading
									isRendered={isRendered}
									setIsRendered={setIsRendered}
								>
									{isOnePlayer ? <Leaderboard /> : <Navigate to="/" />}
								</Loading>
							</PrivateRoute>
						}
					/>

					<Route
						path={"/help"}
						element={
							<Loading
								isRendered={isRendered}
								setIsRendered={setIsRendered}
							>
								<Help />
							</Loading>
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
};

export default App;
