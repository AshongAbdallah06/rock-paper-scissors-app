import useContextProvider from "../hooks/useContextProvider";

const ChangeMode = ({ setShowChangeModePopup, setSidebarIsShowing }) => {
	const { setIsRulesModalShow, setIsOnePlayer, setPlayerIsChosen, setRoomIsSelected } =
		useContextProvider();

	return (
		<>
			<div className="rules-overlay">
				<div className="rules-modal change-mode-modal">
					<h2>Are you sure you want to change mode?</h2>

					<div className="buttons">
						<button
							className="btn cancel"
							onClick={() => {
								setShowChangeModePopup(false);
							}}
						>
							Cancel
						</button>

						<button
							className="btn yes"
							onClick={() => {
								setShowChangeModePopup(false);

								setTimeout(() => {
									setIsOnePlayer(true);
								}, 2000);
								setPlayerIsChosen(true);
								setRoomIsSelected(true);
								setSidebarIsShowing(false);

								window.location.reload();
							}}
						>
							Yes
						</button>
					</div>
					<p>
						Changing the game mode would exit the room, <br /> Thereby disconnecting you
						from your opponent.
					</p>
				</div>
			</div>
		</>
	);
};

export default ChangeMode;
