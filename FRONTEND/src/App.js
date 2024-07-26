import "./App.css";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./GameBoard";
import { createContext, useEffect, useState } from "react";
import Dialog from "./components/Dialog";
import useCheckContext from "./hooks/useCheckContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useGetHome from "./hooks/useGetHome";
import Chat from "./components/Chat";

export const GameContext = createContext();
function App() {
	const { userExist, gameState } = useCheckContext();

	// const { getHome } = useGetHome();

	// useEffect(() => {
	// 	getHome();
	// }, []);

	const [chatIsShowing, setChatIsShowing] = useState(false);

	return (
		<div>
			<Router>
				{/* *<Routes>
					<Route
						path="/"
						element={
							userExist ? (
								<>
									<ScoreBoard />
									<GameBoard />
									<Dialog />
								</>
							) : (
								<Navigate to="/login" />
							)
						}
					/>

					<Route
						path="/login"
						element={!userExist ? <Login /> : <Navigate to="/" />}
					/>

					<Route
						path={"/signup"}
						element={!userExist ? <Signup /> : <Navigate to="/" />}
					/>
				</Routes>* */}

				<ScoreBoard
					setChatIsShowing={setChatIsShowing}
					chatIsShowing={chatIsShowing}
				/>
				<GameBoard />
				<Dialog />

				{chatIsShowing && <Chat setChatIsShowing={setChatIsShowing} />}
			</Router>
		</div>
	);
}

export default App;
