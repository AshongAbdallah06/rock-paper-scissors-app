
import "./App.css";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./GameBoard";
import modalImage from "./images/image-rules.svg"
import closeIcon from "./images/icon-close.svg"


function App() {
	const handlemodalShow = () => {
		const modal = document.querySelector("dialog")
		modal.show()
	}

	const handlecloseModal = () => {
		const modal = document.querySelector("dialog")
		modal.close()
	}
	
	return (
		<div>
			<ScoreBoard />

			<GameBoard />

			<dialog>
				<div>
					<h1>RULES</h1>
					<button onClick={handlecloseModal}><img src={closeIcon} alt=""/></button>
				</div>
				<img src={modalImage} alt=""/>
			</dialog>
			
			<button className="rules" onClick={handlemodalShow}>RULES</button>
		</div>
	);
}

export default App;
